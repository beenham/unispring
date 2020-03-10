package xyz.bobby.unispring.controller;

import lombok.Setter;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.LoginException;
import xyz.bobby.unispring.exception.NotLoggedInException;
import xyz.bobby.unispring.exception.UnauthorizedException;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.StaffRepository;
import xyz.bobby.unispring.repository.StudentRepository;
import xyz.bobby.unispring.repository.UserRepository;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final String SESSION_USER = "user";

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private StaffRepository staffRepository;

	@PostMapping(value = "/register/student", consumes = MediaType.ALL_VALUE)
	public User registerStudent(@Valid @RequestBody Student student) {
		student.setPasswordHash(BCrypt.hashpw(student.getPassword(), BCrypt.gensalt()));
		student.setStage(Student.Stage.ONE);
		student.setFeesPaid(false);
		return studentRepository.save(student);
	}

	@PostMapping(value = "/register/staff", consumes = MediaType.ALL_VALUE)
	public User registerStaff(@Valid @RequestBody Staff staff) {
		staff.setPasswordHash(BCrypt.hashpw(staff.getPassword(), BCrypt.gensalt()));
		return staffRepository.save(staff);
	}

	private static class LoginParams {
		@Setter String emailAddress;
		@Setter String password;
	}

	@PostMapping(value = "/login", consumes = MediaType.ALL_VALUE)
	public User login(@Valid @RequestBody LoginParams loginParams, HttpServletRequest req) throws LoginException {
		User user = userRepository.findByEmailAddressIgnoreCase(loginParams.emailAddress).orElseThrow(LoginException::new);
		boolean correct = BCrypt.checkpw(loginParams.password, user.getPasswordHash());
		if (!correct) throw new LoginException();

		req.getSession().setAttribute(SESSION_USER, user);
		return user;
	}

	@GetMapping("/logout")
	public String logout(HttpServletRequest req) {
		req.getSession().invalidate();
		return "/login";
	}

	@PostMapping(value = "/profile/{id}/payfees", consumes = MediaType.ALL_VALUE)
	public boolean payFees(@PathVariable int id, HttpServletRequest req)
			throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser(req);
		verifyRole(req, Student.class);
		verifyId(req, id);
		Student student = (Student) user;
		student.setFeesPaid(true);
		studentRepository.save(student);
		return student.isFeesPaid();
	}

	public static User getSessionUser(HttpServletRequest req) {
		return (User) req.getSession().getAttribute(SESSION_USER);
	}

	public static void verifyId(HttpServletRequest req, int id) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser(req);
		if (user == null) throw new NotLoggedInException();
		if (user.getId() != id) throw new UnauthorizedException(); // TODO: Return other exceptions
	}

	public static void verifyRole(HttpServletRequest req, Class<?> role) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser(req);
		if (user == null) throw new NotLoggedInException();
		if (!role.isInstance(user)) throw new UnauthorizedException(); // TODO: Return other exceptions
	}
}
