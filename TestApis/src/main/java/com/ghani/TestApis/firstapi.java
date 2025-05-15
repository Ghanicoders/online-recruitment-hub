package com.ghani.TestApis;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

// Method	Endpoint	              Description
// POST	    /api/auth/signup	      Register user
// POST	    /api/auth/login	          Login, returns JWT
// GET	    /api/jobs	              List all jobs
// POST	    /api/jobs	              Create job (recruiter)
// POST	    /api/apply/{jobId}	      Apply to job
// GET	    /api/applications/me	  User’s applications

@RestController
@CrossOrigin
public class firstapi {

    @GetMapping("/")
    public String homeString() {
        return new String("Hello world");
    }

}
