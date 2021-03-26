package com.barbershop.cartel.assignments.service;

import com.barbershop.cartel.assignments.entity.AssignmentEntity;
import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import com.barbershop.cartel.assignments.models.AssignmentModel;
import com.barbershop.cartel.assignments.repository.AssignmentRepository;
import com.barbershop.cartel.barbers.entity.BarberEntity;
import com.barbershop.cartel.barbers.interfaces.BarberInterface;
import com.barbershop.cartel.errors.CartelCustomException;
import com.barbershop.cartel.services.entity.ServiceEntity;
import com.barbershop.cartel.services.interfaces.ServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssignmentServices implements AssignmentInterface {

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private BarberInterface barberInterface;

    @Autowired
    private ServiceInterface serviceInterface;

    @Override
    public List<AssignmentModel> getAssignments(long barberId) {

        List<AssignmentModel> assignmentModels = new ArrayList<>();

        BarberEntity barber = barberInterface.getBarberById(barberId);
        List<AssignmentEntity> assignmentsByBarber = assignmentRepository.findAllByBarber(barber);

        for (AssignmentEntity assignment : assignmentsByBarber) {

            AssignmentModel assignmentModel = new AssignmentModel();

            assignmentModel.setId(assignment.getId());
            assignmentModel.setPrice(assignment.getPrice());
            assignmentModel.setDuration(assignment.getDuration());
            assignmentModel.setBarberId(assignment.getBarber().getId());
            assignmentModel.setServiceId(assignment.getService().getId());

            assignmentModels.add(assignmentModel);
        }

        return assignmentModels;
    }

    @Override
    public void updateAssignment(AssignmentModel assignmentModel) {

        BarberEntity barber = barberInterface.getBarberById(assignmentModel.getBarberId());
        ServiceEntity service = serviceInterface.getServiceById(assignmentModel.getServiceId());

        AssignmentEntity assignment = assignmentRepository.findById(assignmentModel.getId())
                .orElseThrow(() -> new CartelCustomException("Assignment with id:" + assignmentModel.getId() + " is not existing"));

        assignment.setPrice(assignmentModel.getPrice());
        assignment.setDuration(assignmentModel.getDuration());
        assignment.setBarber(barber);
        assignment.setService(service);

        assignmentRepository.save(assignment);
    }

    @Override
    public AssignmentEntity createAssignment(AssignmentModel assignmentModel) {

        BarberEntity barber = barberInterface.getBarberById(assignmentModel.getBarberId());
        ServiceEntity service = serviceInterface.getServiceById(assignmentModel.getServiceId());

        AssignmentEntity assignment = new AssignmentEntity();

        assignment.setPrice(assignmentModel.getPrice());
        assignment.setDuration(assignmentModel.getDuration());
        assignment.setBarber(barber);
        assignment.setService(service);

        return assignmentRepository.save(assignment);
    }

    @Override
    public void deleteAssignment(long assignmentId) {

        AssignmentEntity assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new CartelCustomException("Assignment with id:" + assignmentId + " is not existing"));

        assignmentRepository.delete(assignment);
    }
}
