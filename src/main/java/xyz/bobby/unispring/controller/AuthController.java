package xyz.bobby.unispring.controller;

import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
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
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
	private static final String SESSION_USER = "user";

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private StaffRepository staffRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

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
	public Integer login(@Valid @RequestBody LoginParams loginParams, HttpServletRequest req) throws LoginException {
		UsernamePasswordAuthenticationToken authReq
				= new UsernamePasswordAuthenticationToken(loginParams.emailAddress, loginParams.password);

		Authentication auth;
		try {
			auth = authManager.authenticate(authReq);
		} catch (AuthenticationException e) {
			e.printStackTrace();
			throw new LoginException();
		}

		SecurityContext sc = SecurityContextHolder.getContext();
		sc.setAuthentication(auth);
		HttpSession session = req.getSession(true);
		session.setAttribute(HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY, sc);

		User user = (User) auth.getPrincipal();

		req.getSession().setAttribute(SESSION_USER, auth.getPrincipal());
		return user.getId();
	}

	@GetMapping("/logout")
	public void logout(HttpServletRequest req) {
		req.getSession().invalidate();
	}

	@PostMapping(value = "/profile/{id}/payfees", consumes = MediaType.ALL_VALUE)
	public boolean payFees(@PathVariable int id) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser();
		verifyRole(Student.class);
		verifyId(id);
		Student student = (Student) user;
		student.setFeesPaid(true);
		studentRepository.save(student);
		return student.isFeesPaid();
	}

	public static User getSessionUser() {
		return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	public static void verifyId(int id) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser();
		if (user == null) throw new NotLoggedInException();
		if (user.getId() != id) throw new UnauthorizedException(); // TODO: Return other exceptions
	}

	public static void verifyRole(Class<?> role) throws NotLoggedInException, UnauthorizedException {
		User user = getSessionUser();
		if (user == null) throw new NotLoggedInException();
		if (!role.isInstance(user)) throw new UnauthorizedException(); // TODO: Return other exceptions
	}
}
