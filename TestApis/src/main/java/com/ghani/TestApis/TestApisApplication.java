package com.ghani.TestApis;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

// Method	Endpoint	              Description
// POST	    /api/auth/signup	      Register user
// POST	    /api/auth/login	          Login, returns JWT
// GET	    /api/jobs	              List all jobs
// POST	    /api/jobs	              Create job (recruiter)
// POST	    /api/apply/{jobId}	      Apply to job
// GET	    /api/applications/me	  User’s applications

@CrossOrigin
@SpringBootApplication
public class TestApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestApisApplication.class, args);
	}

}
