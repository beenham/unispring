package xyz.bobby.unispring.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import xyz.bobby.unispring.exception.ResourceNotFoundException;
import xyz.bobby.unispring.model.Topic;
import xyz.bobby.unispring.repository.TopicRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/topics")
public class TopicController {
	@Autowired
	private TopicRepository topicRepository;

	@GetMapping()
	public List<Topic> getTopics() {
		return topicRepository.findAll();
	}

	@GetMapping(value = "/{id}")
	public Topic getTopic(@PathVariable("id") int id) throws ResourceNotFoundException {
		return topicRepository.getTopic(id);
	}

	@PostMapping(value = "/{id}")
	public Topic createTopic(@PathVariable("id") int id, @Valid @RequestBody Topic topic) {
		return topicRepository.save(topic);
	}

	@DeleteMapping(value = "/{id}")
	public void deleteTopic(@PathVariable("id") int id) {
		topicRepository.deleteById(id);
	}
}
