package xyz.bobby.unispring.repository;

import lombok.SneakyThrows;
import org.hibernate.collection.internal.PersistentSet;
import org.springframework.data.rest.core.event.AbstractRepositoryEventListener;
import org.springframework.stereotype.Component;
import xyz.bobby.unispring.exception.ModuleUnavailableException;
import xyz.bobby.unispring.model.Module;

import java.util.Iterator;

@Component
public class ModuleRepositoryEventListener extends AbstractRepositoryEventListener<Module> {
	private final ModuleRepository moduleRepository;

	public ModuleRepositoryEventListener(ModuleRepository moduleRepository) {
		super();
		this.moduleRepository = moduleRepository;
	}

	@SneakyThrows
	@Override
	protected void onBeforeSave(Module module) {
		if (module.getStatus().equals(Module.Status.TERMINATED))
			throw new ModuleUnavailableException(Module.Status.TERMINATED, module.getId());
	}

	@SneakyThrows
	@Override
	protected void onBeforeLinkSave(Module parent, Object linked) {
		if (parent.getStatus().equals(Module.Status.TERMINATED))
			throw new ModuleUnavailableException(Module.Status.TERMINATED, parent.getId());
		if (parent.getStatus().equals(Module.Status.FULL))
			throw new ModuleUnavailableException(Module.Status.FULL, parent.getId());
		if (parent.getStudents().size() == parent.getCapacity())
			parent.setStatus(Module.Status.FULL);
	}

	@SneakyThrows
	@Override
	protected void onBeforeLinkDelete(Module parent, Object linked) {
		Module oldModule = moduleRepository.getModule(parent.getId());
		System.out.println(parent.getStudents().size());
		System.out.println(oldModule.getStudents().size());
		if (parent.getStatus().equals(Module.Status.TERMINATED))
			throw new ModuleUnavailableException(Module.Status.TERMINATED, parent.getId());
		if (parent.getStatus().equals(Module.Status.FULL))
			parent.setStatus(Module.Status.AVAILABLE);
		System.out.println(parent.getStudents().size());
	}

	@SneakyThrows
	@Override
	protected void onBeforeDelete(Module entity) {
		if (entity.getStatus().equals(Module.Status.TERMINATED))
			throw new ModuleUnavailableException(Module.Status.TERMINATED, entity.getId());
	}
}
