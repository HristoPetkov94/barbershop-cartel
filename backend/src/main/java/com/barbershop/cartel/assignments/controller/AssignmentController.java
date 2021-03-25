package com.barbershop.cartel.assignments.controller;

import com.barbershop.cartel.assignments.interfaces.AssignmentInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/assignments")
public class AssignmentController {

    @Autowired
    private AssignmentInterface assignmentInterface;

}
