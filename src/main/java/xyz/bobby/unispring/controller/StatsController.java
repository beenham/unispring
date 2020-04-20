package xyz.bobby.unispring.controller;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.GradeRepository;
import xyz.bobby.unispring.repository.StaffRepository;
import xyz.bobby.unispring.repository.StudentRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stats")
public class StatsController {
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private StaffRepository staffRepository;
	@Autowired
	private GradeRepository gradeRepository;

	@Data
	public static class Stats {
		Map<String, Long> studentNationalityBreakdown;
		Map<Student.Stage, Long> studentStageBreakdown;
		Map<User.Gender, Long> studentGenderBreakdown;
		Map<User.Gender, Long> staffGenderBreakdown;
		Map<Grade.LetterGrade, Long> gradeBreakdown;
	}

	@GetMapping
	private Object stats() {
		List<Student> students = studentRepository.findAll();
		List<Staff> staff = staffRepository.findAll();
		List<Grade> grades = gradeRepository.findAll();

		Stats stats = new Stats();

		stats.studentNationalityBreakdown = students.stream()
				.collect(Collectors.groupingBy(User::getNationality, Collectors.counting()));

		stats.studentStageBreakdown = students.stream()
				.collect(Collectors.groupingBy(Student::getStage, Collectors.counting()));

		stats.studentGenderBreakdown = students.stream()
				.collect(Collectors.groupingBy(User::getGender, Collectors.counting()));

		stats.staffGenderBreakdown = staff.stream()
				.collect(Collectors.groupingBy(User::getGender, Collectors.counting()));

		stats.gradeBreakdown = grades.stream()
				.collect(Collectors.groupingBy(Grade::getGrade, Collectors.counting()));

		return stats;
	}
}
