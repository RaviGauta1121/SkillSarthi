import { Link } from "react-router-dom";
import { Images } from "../../../../assets/images";
import "./ChooseResume.scss";

const ChooseResume = () => {
  return (
    <section className="choose-resume">
      <div className="container">
        <div className="choose-resume-wrap">
          <h3 className="choose-resume-ttl">
            Write your professional resume online.
          </h3>
          <p className="choose-resume-lead">
            Download with a single click. Land that dream job.
          </p>
          <div className="choose-resume-content">
            <img src={Images.ResumeTemplate} alt="" />
            <Link to="/resume" className="btn btn-red btn-choose-template">
              <span className="btn-text">choose a resume template</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseResume;
