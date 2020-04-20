package xyz.bobby.unispring.controller;

import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.exception.NotLoggedInException;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.exception.UnauthorizedException;
import xyz.bobby.unispring.model.*;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.repository.GradeRepository;
import xyz.bobby.unispring.repository.ModuleRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/grades")
public class GradeController {
	@Autowired
	private GradeRepository gradeRepository;

	@GetMapping(value = "/self")
	@JsonView(View.Public.class)
	public Set<Grade> getOwnGrades(HttpServletRequest req) throws NotLoggedInException, UnauthorizedException {
		Student student = AuthController.requireRole(req, Student.class);
		return student.getGrades();
	}
}
