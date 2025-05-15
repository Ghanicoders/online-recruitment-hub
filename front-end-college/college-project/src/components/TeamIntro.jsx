import React from "react";

const TeamIntro = () => {
  return (
    <>
      {/* Our Team */}
      <div className="text-center mb-4">
        <h3 className="fw-semibold mb-3">Meet the Team</h3>

        {/* Founder Section */}
        <div className="mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Replace with your photo
            alt="Musarraf Sr"
            className="rounded-circle shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <h5 className="mt-2 mb-1">Musarraf Sr</h5>
          <small className="text-muted">Founder & Full Stack Developer</small>
        </div>

        {/* Team Members Grid */}
        <div className="row justify-content-center g-3 px-2">
          {[
            {
              name: "Mojahid Hussain",
              title: "Frontend Developer",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Bikas R Dey",
              title: "UI/UX Designer",
              img: "https://randomuser.me/api/portraits/men/65.jpg",
            },
            {
              name: "Sourabh Maurya",
              title: "Backend Developer",
              img: "https://randomuser.me/api/portraits/men/52.jpg",
            },
            {
              name: "Rakhi Kumari",
              title: "QA Engineer",
              img: "https://randomuser.me/api/portraits/women/44.jpg",
            },
          ].map((member, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <div className="card border-0 text-center shadow-sm p-2">
                <img
                  src={member.img}
                  alt={member.name}
                  className="rounded-circle mx-auto mb-2"
                  style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />
                <div className="card-body p-0">
                  <h6 className="mb-1">{member.name}</h6>
                  <small className="text-muted">{member.title}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TeamIntro;
