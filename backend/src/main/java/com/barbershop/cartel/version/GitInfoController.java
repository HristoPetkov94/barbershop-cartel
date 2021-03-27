package com.barbershop.cartel.version;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class GitInfoController {

    @Autowired
    private GitInfo info;

    @GetMapping("/git-info")
    public GitInfo version() {

        GitInfo result = new GitInfo();

        result.setGitBranch(info.getGitBranch());
        result.setGitBuildTime(info.getGitBuildTime());
        result.setGitCommitId(info.getGitCommitId());

        return result;
    }
}
