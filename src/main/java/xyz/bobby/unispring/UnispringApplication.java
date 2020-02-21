package xyz.bobby.unispring;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import xyz.bobby.unispring.model.User;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@SpringBootApplication
@EnableJpaRepositories("xyz.bobby.unispring.repository")
public class UnispringApplication {
	private static final List<String> femaleNames = Arrays.asList("OLIVIA", "RUBY", "EMILY", "GRACE", "JESSICA", "CHLOE", "SOPHIE", "LILY", "AMELIA", "EVIE", "MIA", "ELLA", "CHARLOTT", "LUCY", "MEGAN", "ELLIE", "ISABELLE", "ISABELLA", "HANNAH", "KATIE", "AVA", "HOLLY", "SUMMER", "MILLIE", "DAISY", "PHOEBE", "FREYA", "ABIGAIL", "POPPY", "ERIN", "EMMA", "MOLLY", "IMOGEN", "AMY", "JASMINE", "ISLA", "SCARLETT", "LEAH", "SOPHIA", "ELIZABET", "EVA", "BROOKE", "MATILDA", "CAITLIN", "KEIRA", "ALICE", "LOLA", "LILLY", "AMBER", "ISABEL", "LAUREN", "GEORGIA", "GRACIE", "ELEANOR", "BETHANY", "MADISON", "AMELIE", "ISOBEL", "PAIGE", "LACEY", "SIENNA", "LIBBY", "MAISIE", "ANNA", "REBECCA", "ROSIE", "TIA", "LAYLA", "MAYA", "NIAMH", "ZARA", "SARAH", "LEXI", "MADDISON", "ALISHA", "SOFIA", "SKYE", "NICOLE", "LEXIE", "FAITH", "MARTHA", "HARRIET", "ZOE", "EVE", "JULIA", "AIMEE", "HOLLIE", "LYDIA", "EVELYN", "ALEXANDRA", "MARIA", "FRANCESCA", "TILLY", "FLORENCE", "ALICIA", "ABBIE", "EMILIA", "COURTNEY", "MARYAM", "ESME");
	private static final List<String> maleNames = Arrays.asList("JACK", "OLIVER", "THOMAS", "HARRY", "JOSHUA", "ALFIE", "CHARLIE", "DANIEL", "JAMES", "WILLIAM", "SAMUEL", "GEORGE", "JOSEPH", "LEWIS", "ETHAN", "MOHAMMED", "DYLAN", "BENJAMIN", "ALEXANDER", "JACOB", "RYAN", "LIAM", "JAKE", "MAX", "LUKE", "TYLER", "CALLUM", "MATTHEW", "JAYDEN", "OSCAR", "ARCHIE", "ADAM", "RILEY", "HARVEY", "HARRISON", "LUCAS", "MUHAMMAD", "HENRY", "ISAAC", "LEO", "CONNOR", "EDWARD", "FINLEY", "LOGAN", "NOAH", "CAMERON", "ALEX", "OWEN", "RHYS", "NATHAN", "JAMIE", "MICHAEL", "MASON", "TOBY", "AARON", "CHARLES", "BEN", "THEO", "LOUIS", "FREDDIE", "FINLAY", "LEON", "HARLEY", "DAVID", "MOHAMMAD", "REECE", "KIAN", "KAI", "KYLE", "BRANDON", "HAYDEN", "ZACHARY", "KIERAN", "LUCA", "ASHTON", "BAILEY", "SEBASTIAN", "GABRIEL", "SAM", "EVAN", "BRADLEY", "ELLIOT", "JOHN", "TAYLOR", "JOE", "COREY", "REUBEN", "JOEL", "ROBERT", "ELLIS", "BLAKE", "AIDAN", "LOUIE", "CHRISTOPHER", "EWAN", "JAY", "MORGAN", "BILLY", "SEAN", "ZAK");
	private static final List<String> surnames = Arrays.asList("Murphy", "Kelly", "O’Sullivan", "Walsh", "Smith", "O’Brien", "Byrne", "Ryan", "O’Connor", "O’Neill", "O’Reilly", "Doyle", "McCarthy", "Gallagher", "O’Doherty", "Kennedy", "Lynch", "Murray", "Quinn", "Moore", "McLoughlin", "O’Carroll", "Connolly", "Daly", "O’Connell", "Wilson", "Dunne", "Brennan", "Burke", "Collins", "Campbell", "Clarke", "Johnston", "Hughes", "O’Farrell", "Fitzgerald", "Brown", "Martin", "Maguire", "Nolan", "Flynn", "Thompson", "O’Callagha", "O’Donnell", "Duffy", "O’Mahony", "Boyle", "Healy", "O’Shea", "White", "Sweeney", "Hayes", "Kavanagh", "Power", "McGrath", "Moran", "Brady", "Stewart", "Casey", "Foley", "Fitzpatricrick", "O’Leary", "McDonnell", "MacMahon", "Donnelly", "Regan", "Donovan", "Burns", "Flanagan", "Mullan", "Barry", "Kane", "Robinson", "Cunningham", "Griffin", "Kenny", "Sheehan", "Ward", "Whelan", "Lyons", "Reid", "Graham", "Higgins", "Cullen", "Keane", "King", "Maher", "MacKenna", "Bell", "Scott", "Hogan", "O’Keeffe", "Magee", "MacNamara", "MacDonald", "MacDermott", "Molony", "O’Rourke", "Buckley", "O’Dwyer");
	private static final List<String> countries = Arrays.asList("Ireland", "Serbia", "UK", "US");

	private static void populateDb() {
		Random random = new Random();
		ObjectMapper mapper = new ObjectMapper();
		HttpClient httpClient = HttpClient.newBuilder()
				.version(HttpClient.Version.HTTP_2)
				.build();
		try {
			for (int i = 0; i < 5; i++) {
				User user = getUser(random, User.Role.STAFF, "staff" + i, 12345700 + i, "staff" + i + "@email.com", "7654321-" + i);
				String body = mapper.writeValueAsString(user);
				HttpRequest request = HttpRequest.newBuilder()
						.POST(HttpRequest.BodyPublishers.ofString(body))
						.uri(URI.create("http://localhost:8080/auth/register/"))
						.header("content-type", "application/json")
						.build();
				httpClient.send(request, HttpResponse.BodyHandlers.ofString());
			}

			for (int i = 0; i < 50; i++) {
				User user = getUser(random, User.Role.STUDENT, "student" + i, 12345600 + i, "student" + i + "@email.com", "1234567-" + i);
				String body = mapper.writeValueAsString(user);
				HttpRequest request = HttpRequest.newBuilder()
						.POST(HttpRequest.BodyPublishers.ofString(body))
						.uri(URI.create("http://localhost:8080/auth/register/"))
						.header("content-type", "application/json")
						.build();
				httpClient.send(request, HttpResponse.BodyHandlers.ofString());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static User getUser(Random random, User.Role role, String username, int number, String email, String phoneNumber) {
		User user = new User();
		user.setUsername(username);
		user.setStudentNumber(number);
		user.setRole(role);
		user.setGender(random.nextInt(2) == 0 ? User.Gender.FEMALE : User.Gender.MALE);
		if (user.getGender() == User.Gender.MALE)
			user.setForename(maleNames.get(random.nextInt(maleNames.size())));
		else
			user.setForename(femaleNames.get(random.nextInt(femaleNames.size())));
		user.setSurname(surnames.get(random.nextInt(surnames.size())).toUpperCase());
		user.setNationality(countries.get(random.nextInt(countries.size())));
		user.setAddress("Address");
		user.setEmailAddress(email);
		user.setPassword("password");
		user.setPhoneNumber(phoneNumber);
		return user;
	}

	public static void main(String[] args) {
		SpringApplication.run(UnispringApplication.class, args);
		populateDb();
	}
}
