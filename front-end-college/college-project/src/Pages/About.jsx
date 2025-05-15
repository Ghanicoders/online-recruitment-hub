import React from "react";
import NavBar from "../Components/NavBar";
import TeamIntro from "../components/TeamIntro";

const About = () => {
  return (
    <>
      <NavBar />

      <div className="container py-3">
        <div className="text-center mb-3">
          <h1 className="fw-bold">About Us</h1>
          <p className="lead text-muted">
            Empowering Careers. Connecting Talent. Creating Opportunities.
          </p>
        </div>

        {/* Mission Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1600880291801-6557f3adf9b3?auto=format&fit=crop&w=800&q=80"
              alt="mission"
              className="img-fluid rounded shadow"
            />
          </div>
          <div className="col-md-6">
            <h3 className="fw-semibold">Our Mission</h3>
            <p>
              At <strong>Job Portal</strong>, our mission is to bridge the gap
              between job seekers and employers through innovative technology
              and a user-friendly platform. We strive to create a space where
              talent meets opportunity and dreams turn into careers.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="row text-center mb-5">
          <h3 className="fw-semibold mb-4">What We Offer</h3>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">For Job Seekers</h5>
                <p className="card-text">
                  Discover thousands of job listings, apply with ease, and track
                  your application status — all in one place.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">For Employers</h5>
                <p className="card-text">
                  Post jobs, filter candidates, and connect with talent that
                  matches your vision and goals.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title">Smart Matchmaking</h5>
                <p className="card-text">
                  Our platform intelligently matches job roles with suitable
                  candidates using modern filtering and tags.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Team */}
        <TeamIntro />

        {/* Footer message */}
        <div className="text-center mt-2">
          <p className="text-muted">
            &copy; {new Date().getFullYear()} Job Portal. Built with 💙 for job
            seekers and employers.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
