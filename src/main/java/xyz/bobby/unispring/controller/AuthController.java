package xyz.bobby.unispring.controller;

import lombok.Setter;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
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
import java.io.IOException;

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

	private static class RegisterStudentParams {
		@Setter String emailAddress;
		@Setter String password;
		@Setter String firstname;
		@Setter String surname;
		@Setter String phoneNumber;
		@Setter String studentNumber;
		@Setter String streetAddress;
		@Setter String town;
		@Setter String city;
		@Setter String country;
		@Setter String gender;
	}

	@PostMapping(value = "/student/register", consumes = MediaType.ALL_VALUE)
	public User registerStudent(@Valid @RequestBody RegisterStudentParams params) throws IOException {
		Student user = new Student();
		user.setUsername(params.firstname + " " + params.surname);
		user.setGender(Student.Gender.valueOf(params.gender));
		user.setForename(params.firstname);
		user.setSurname(params.surname);
		user.setNationality(params.country);
		user.setAddress(params.streetAddress + " " + params.town + " " + params.city + " " + params.country);
		user.setEmailAddress(params.emailAddress);
		user.setPasswordHash(BCrypt.hashpw(params.password, BCrypt.gensalt()));
		user.setPhoneNumber(params.phoneNumber);
		user.setStudentNumber(Integer.parseInt(params.studentNumber));
		user.setStage(Student.Stage.DOCTORATE);
		return studentRepository.save(user);
	}

	@PostMapping(value = "/staff/register", consumes = MediaType.ALL_VALUE)
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

		req.getSession().setAttribute(SESSION_USER, user.getId());
		System.out.println(SESSION_USER);
		return user;
	}

	@GetMapping("/logout")
	public String logout(HttpServletRequest req) {
		req.getSession().invalidate();
		return "/login";
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
