package xyz.bobby.unispring.util;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import xyz.bobby.unispring.config.ApplicationConfig;
import xyz.bobby.unispring.model.Grade;
import xyz.bobby.unispring.model.Module;
import xyz.bobby.unispring.model.Staff;
import xyz.bobby.unispring.model.Student;
import xyz.bobby.unispring.model.User;
import xyz.bobby.unispring.repository.GradeRepository;
import xyz.bobby.unispring.repository.ModuleRepository;
import xyz.bobby.unispring.repository.StaffRepository;
import xyz.bobby.unispring.repository.StudentRepository;

import java.time.Year;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;
import java.util.logging.Logger;

@Component
public class DatabasePopulator {
	private static final List<String> femaleNames = Arrays.asList("OLIVIA", "RUBY", "EMILY", "GRACE", "JESSICA", "CHLOE", "SOPHIE", "LILY", "AMELIA", "EVIE", "MIA", "ELLA", "CHARLOTT", "LUCY", "MEGAN", "ELLIE", "ISABELLE", "ISABELLA", "HANNAH", "KATIE", "AVA", "HOLLY", "SUMMER", "MILLIE", "DAISY", "PHOEBE", "FREYA", "ABIGAIL", "POPPY", "ERIN", "EMMA", "MOLLY", "IMOGEN", "AMY", "JASMINE", "ISLA", "SCARLETT", "LEAH", "SOPHIA", "ELIZABET", "EVA", "BROOKE", "MATILDA", "CAITLIN", "KEIRA", "ALICE", "LOLA", "LILLY", "AMBER", "ISABEL", "LAUREN", "GEORGIA", "GRACIE", "ELEANOR", "BETHANY", "MADISON", "AMELIE", "ISOBEL", "PAIGE", "LACEY", "SIENNA", "LIBBY", "MAISIE", "ANNA", "REBECCA", "ROSIE", "TIA", "LAYLA", "MAYA", "NIAMH", "ZARA", "SARAH", "LEXI", "MADDISON", "ALISHA", "SOFIA", "SKYE", "NICOLE", "LEXIE", "FAITH", "MARTHA", "HARRIET", "ZOE", "EVE", "JULIA", "AIMEE", "HOLLIE", "LYDIA", "EVELYN", "ALEXANDRA", "MARIA", "FRANCESCA", "TILLY", "FLORENCE", "ALICIA", "ABBIE", "EMILIA", "COURTNEY", "MARYAM", "ESME");
	private static final List<String> maleNames = Arrays.asList("JACK", "OLIVER", "THOMAS", "HARRY", "JOSHUA", "ALFIE", "CHARLIE", "DANIEL", "JAMES", "WILLIAM", "SAMUEL", "GEORGE", "JOSEPH", "LEWIS", "ETHAN", "MOHAMMED", "DYLAN", "BENJAMIN", "ALEXANDER", "JACOB", "RYAN", "LIAM", "JAKE", "MAX", "LUKE", "TYLER", "CALLUM", "MATTHEW", "JAYDEN", "OSCAR", "ARCHIE", "ADAM", "RILEY", "HARVEY", "HARRISON", "LUCAS", "MUHAMMAD", "HENRY", "ISAAC", "LEO", "CONNOR", "EDWARD", "FINLEY", "LOGAN", "NOAH", "CAMERON", "ALEX", "OWEN", "RHYS", "NATHAN", "JAMIE", "MICHAEL", "MASON", "TOBY", "AARON", "CHARLES", "BEN", "THEO", "LOUIS", "FREDDIE", "FINLAY", "LEON", "HARLEY", "DAVID", "MOHAMMAD", "REECE", "KIAN", "KAI", "KYLE", "BRANDON", "HAYDEN", "ZACHARY", "KIERAN", "LUCA", "ASHTON", "BAILEY", "SEBASTIAN", "GABRIEL", "SAM", "EVAN", "BRADLEY", "ELLIOT", "JOHN", "TAYLOR", "JOE", "COREY", "REUBEN", "JOEL", "ROBERT", "ELLIS", "BLAKE", "AIDAN", "LOUIE", "CHRISTOPHER", "EWAN", "JAY", "MORGAN", "BILLY", "SEAN", "ZAK");
	private static final List<String> surnames = Arrays.asList("Murphy", "Kelly", "O’Sullivan", "Walsh", "Smith", "O’Brien", "Byrne", "Ryan", "O’Connor", "O’Neill", "O’Reilly", "Doyle", "McCarthy", "Gallagher", "O’Doherty", "Kennedy", "Lynch", "Murray", "Quinn", "Moore", "McLoughlin", "O’Carroll", "Connolly", "Daly", "O’Connell", "Wilson", "Dunne", "Brennan", "Burke", "Collins", "Campbell", "Clarke", "Johnston", "Hughes", "O’Farrell", "Fitzgerald", "Brown", "Martin", "Maguire", "Nolan", "Flynn", "Thompson", "O’Callagha", "O’Donnell", "Duffy", "O’Mahony", "Boyle", "Healy", "O’Shea", "White", "Sweeney", "Hayes", "Kavanagh", "Power", "McGrath", "Moran", "Brady", "Stewart", "Casey", "Foley", "Fitzpatricrick", "O’Leary", "McDonnell", "MacMahon", "Donnelly", "Regan", "Donovan", "Burns", "Flanagan", "Mullan", "Barry", "Kane", "Robinson", "Cunningham", "Griffin", "Kenny", "Sheehan", "Ward", "Whelan", "Lyons", "Reid", "Graham", "Higgins", "Cullen", "Keane", "King", "Maher", "MacKenna", "Bell", "Scott", "Hogan", "O’Keeffe", "Magee", "MacNamara", "MacDonald", "MacDermott", "Molony", "O’Rourke", "Buckley", "O’Dwyer");
	private static final List<String> countries = Arrays.asList("Ireland", "Serbia", "GB", "US", "IN", "CN", "PL", "IT", "DE", "FR");
	private static final RandomCollection<Student.Stage> randomStage = new RandomCollection<>() {{
		add(45, Student.Stage.ONE);
		add(30, Student.Stage.TWO);
		add(25, Student.Stage.THREE);
		add(25, Student.Stage.FOUR);
		add(15, Student.Stage.MASTERS);
		add(5, Student.Stage.DOCTORATE);
	}};
	private static final RandomCollection<Grade.LetterGrade> randomGrade = new RandomCollection<>() {{
		add(15, Grade.LetterGrade.A);
		add(35, Grade.LetterGrade.B);
		add(45, Grade.LetterGrade.C);
		add(30, Grade.LetterGrade.D);
		add(5, Grade.LetterGrade.E);
		add(5, Grade.LetterGrade.F);
	}};
	private static final RandomCollection<User.Gender> randomGender = new RandomCollection<>() {{
		add(50, User.Gender.MALE);
		add(35, User.Gender.FEMALE);
		add(10, User.Gender.OTHER);
	}};
	private static final Logger LOG = Logger.getLogger(DatabasePopulator.class.getCanonicalName());
	private static final int NUM_STAFF_USERS = 25;		//	recommend max 25
	private static final int NUM_STUDENT_USERS = 250;	//	recommend max 250
	private static final int NUM_MODULE_YEARS = 5;		//	recommend max 5
	private static final int BASE_MODULE_CAPACITY = 30;	//
	private static final Year year = Year.now().minusYears(NUM_MODULE_YEARS - 1);

	private static void populatePeople(StudentRepository stuRepo, StaffRepository staRepo) {
		Random random = new Random();

		printProgress("Creating staff user", 0, NUM_STAFF_USERS);
		Set<Staff> staff = new HashSet<>();
		for (int i = 0; i < NUM_STAFF_USERS; i++) {
			staff.add(createUser(random, new Staff(), String.format("Sta-%03d", i), 12345900 + i,
					String.format("sta-%03d@unispring.edu", i), String.format("765-4321-%03d", i)));
			printProgress("Creating staff user", i, NUM_STAFF_USERS);
		}
		staRepo.saveAll(staff);

		printProgress("Creating student user", 0, NUM_STUDENT_USERS);
		Set<Student> students = new HashSet<>();
		for (int i = 0; i < NUM_STUDENT_USERS; i++) {
			students.add(createUser(random, new Student(), String.format("Stu-%03d", i), 12345600 + i, String.format("stu-%03d@unispring.edu", i), String.format("123-4567-%03d", i)));
			printProgress("Creating student user", i, NUM_STUDENT_USERS);
		}
		stuRepo.saveAll(students);
	}

	private static <T extends User> T createUser(Random random, T user, String username, int number,String email, String phoneNumber) {
		user.setUsername(username);
		user.setGender(randomGender.next());
		if (user.getGender() == User.Gender.MALE)
			user.setForename(maleNames.get(random.nextInt(maleNames.size())));
		else
			user.setForename(femaleNames.get(random.nextInt(femaleNames.size())));
		user.setSurname(surnames.get(random.nextInt(surnames.size())).toUpperCase());
		user.setNationality(countries.get(random.nextInt(countries.size())));
		user.setAddress("Address");
		user.setEmailAddress(email);
		user.setPassword(String.format("%s%02d", user.getForename(), number % 100));
		user.setPhoneNumber(phoneNumber);
		if (user instanceof Student) {
			Student student = (Student) user;
			student.setStudentNumber(number);
			student.setStage(randomStage.next());
			student.setFeesPaid(!student.getStage().equals(Student.Stage.ONE));
		}
		return user;
	}

	private static void populateModules(StudentRepository stuRepo, StaffRepository staRepo, ModuleRepository modRepo,
										GradeRepository gradeRepo) {
		final Map<String, String> moduleNames = new HashMap<>() {{
			put("COMP10110", "Computer Programming I");
			put("COMP10120", "Computer Programming II");
			put("COMP20170", "Introduction to Robotics.");
			put("COMP20090", "Introduction to Cognitive Science");
			put("COMP20280", "Data Structures and Algorithms");
			put("COMP30010", "Introduction to AI");
			put("COMP30220", "Distributed Systems");
			put("COMP30240", "Multi-Agent Systems");
			put("COMP47660", "Secure Software Engineering");
			put("COMP47490", "Machine Learning");
		}};

		Random random = new Random();
		List<Staff> staff = staRepo.findAll();
		printProgress("Creating module", 0, NUM_MODULE_YEARS * 10);
		int count = 0;
		for (String key : moduleNames.keySet()) {
			Staff coordinator = staff.get(random.nextInt(staff.size()));
			Module.Trimester trimester = random.nextInt(2) % 2 == 0 ? Module.Trimester.AUTUMN : Module.Trimester.SPRING;
			Module module;
			for (int i = 0; i < NUM_MODULE_YEARS; i++) {
				modRepo.save(module = createModule(random, coordinator, moduleNames.get(key), key, year.plusYears(i), trimester));
				List<Student> students = stuRepo.findAllByStage(new Student.Stage[]{Student.Stage.ONE,
						Student.Stage.TWO, Student.Stage.THREE, Student.Stage.FOUR, Student.Stage.MASTERS}[4 - i]);
				Set<Student> toSave = new HashSet<>();
				Set<Grade> grades = new HashSet<>();
				while (module.getStatus() == Module.Status.AVAILABLE && students.size() > 0) {
					Student student;
					module.getStudents().add(student = students.remove(random.nextInt(students.size())));
					toSave.add(student);
					grades.add(new Grade(student, module, randomGrade.next()));
					if (module.getStudents().size() == module.getCapacity())
						module.setStatus(Module.Status.FULL);
				}
				if (module.getYear().isBefore(year.plusYears(4)) || trimester != Module.Trimester.SPRING) {
					module.setStatus(Module.Status.TERMINATED);
					gradeRepo.saveAll(grades);
				}
				Module finalModule = module;
				toSave.forEach(s -> s.getModules().add(finalModule));
				stuRepo.saveAll(toSave);
				modRepo.save(module);
				printProgress("Creating module", count++, NUM_MODULE_YEARS * 10);
			}
		}
	}

	private static Module createModule(Random random, Staff coordinator, String name, String code, Year year, Module.Trimester trimester) {
		Module module = new Module();
		module.setCode(code);
		module.setName(name);
		module.setCoordinator(coordinator);
		module.setDescription("Lorem Ipsum this is a description");
		module.setYear(year);
		module.setTrimester(trimester);
		module.setStatus(Module.Status.AVAILABLE);
		module.setPassword(code.substring(4) + year.toString());
		module.setCapacity(random.nextInt(15) + BASE_MODULE_CAPACITY);
		return module;
	}

	private static void printProgress(String message, int current, int total) {
		int percent = (current * 100 / total);
		String string = '\r' +
				message +
				" ... " +
				String.join("", Collections.nCopies(percent == 0 ? 2 : 2 - (int) (Math.log10(percent)), " ")) +
				String.format(" %d%% [", percent) +
				String.join("", Collections.nCopies(percent, "=")) +
				'>' +
				String.join("", Collections.nCopies(100 - percent, " ")) +
				']' +
				String.join("", Collections.nCopies(Math.max((int) (Math.log10(total)) - (int) (Math.log10(current)), 0), " ")) +
				String.format(" %d/%d\r", current, total);
		System.out.print(string);
	}

	@Bean
	public CommandLineRunner populateDb(StudentRepository stuRepo, StaffRepository staRepo, ModuleRepository modRepo,
										GradeRepository gradeRepo, ApplicationConfig config) {
		return (args -> {
			if (config.getPopulateDb()) {
				LOG.info(String.format("%s", "Populating Database..."));
				populatePeople(stuRepo, staRepo);
				populateModules(stuRepo, staRepo, modRepo, gradeRepo);
				LOG.info(String.format("%s", "Finished Populating Database..."));
			} else {
				LOG.info(String.format("%s", "Continue without Populating Database..."));
			}
		});
	}

	private static class RandomCollection<E> {
		private final NavigableMap<Double, E> map = new TreeMap<>();
		private final Random random;
		private double total = 0;

		public RandomCollection() {
			this(new Random());
		}

		public RandomCollection(Random random) {
			this.random = random;
		}

		public void add(double weight, E result) {
			if (weight <= 0) return;
			total += weight;
			map.put(total, result);
		}

		public E next() {
			double value = random.nextDouble() * total;
			return map.higherEntry(value).getValue();
		}
	}
}
