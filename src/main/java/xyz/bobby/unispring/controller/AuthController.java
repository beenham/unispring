package xyz.bobby.unispring.controller;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import xyz.bobby.unispring.model.View;
import xyz.bobby.unispring.repository.StaffRepository;
import xyz.bobby.unispring.repository.StudentRepository;
import xyz.bobby.unispring.repository.UserRepository;
import xyz.bobby.unispring.util.DatabasePopulator;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final String SESSION_USER = "user";
	private static final Logger LOG = Logger.getLogger(AuthController.class.getCanonicalName());

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private @Autowired HttpServletRequest request;

	@PostMapping(value = "/register/student", consumes = MediaType.ALL_VALUE)
	public User registerStudent(@Valid @RequestBody Student student) {
		student.setPassword(passwordEncoder.encode(student.getPassword()));
		student.setStage(Student.Stage.ONE);
		student.setFeesPaid(false);
		return studentRepository.save(student);
	}

	@PostMapping(value = "/register/staff", consumes = MediaType.ALL_VALUE)
	public User registerStaff(@Valid @RequestBody Staff staff) {
		staff.setPassword(passwordEncoder.encode(staff.getPassword()));
		return staffRepository.save(staff);
	}

	private static class LoginParams {
		@Setter String emailAddress;
		@Setter String password;
	}

	@PostMapping(value = "/login", consumes = MediaType.ALL_VALUE)
	@JsonView(View.Internal.class)
	public User login(@Valid @RequestBody LoginParams loginParams, HttpServletRequest req) throws LoginException {
		User user = userRepository.findByEmailAddressIgnoreCase(loginParams.emailAddress).orElse(null);
		if (user == null || !passwordEncoder.matches(loginParams.password, user.getPassword())) {
			throw new LoginException();
		}

		LOG.info(String.format("LOGIN SUCCESSFUL: User %s (ID: %d) logged in successfully from %s.", user.getUsername(), user.getId(), req.getRemoteAddr()));

		HttpSession session = req.getSession(true);
		session.setAttribute(SESSION_USER, user);

		return user;
	}

	@GetMapping("/logout")
	public void logout(HttpServletRequest req) {
		req.getSession().invalidate();
	}

	@PostMapping(value = "/payfees", consumes = MediaType.ALL_VALUE)
	public void payFees(HttpServletRequest req) throws NotLoggedInException, UnauthorizedException {
		Student student = requireRole(req, Student.class);
		student.setFeesPaid(true);
		studentRepository.save(student);

		LOG.info(String.format("PAID FEES: Student %s (ID: %d) has paid their fees.", student.getUsername(), student.getId()));
	}

	public static void refreshSessionUser(HttpServletRequest req) {
		setSessionUser(req, getSessionUser(req));
	}

	public static void setSessionUser(HttpServletRequest req, User user) {
		req.getSession().setAttribute(SESSION_USER, user);
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

	public static <T extends User> T requireRole(HttpServletRequest req, Class<T> role) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser(req);
		if (user == null) throw new NotLoggedInException();
		if (!role.isInstance(user)) throw new UnauthorizedException();
		return (T) user;
	}
}
