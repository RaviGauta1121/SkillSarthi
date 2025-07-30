import { Link } from "react-router-dom";
import { Images } from "../../../../assets/images";
import "./CascadeTemplate.scss";

const CascadeTemplate = () => {
  return (
    <section className="cascade-template">
      <div className="container">
        <div className="cascade-template-wrap">
          <img src={Images.CascadeTemplateImg} className="cascade-template-img" alt="" />
          <div className="cascade-template-content">
            <h3 className="cascade-template-ttl">Cascade template</h3>
            <p className="cascade-template-lead">
              Cascade uses a nifty bar graph for your skills and language
              sections and a sidebar with subtle shading differences.
            </p>
            <p className="cascade-template-text">
              You can add, remove, and rearrange the sections and further
              customize your resume, picking from dozens of color
              combinations...
            </p>
            <div className="separator-line"></div>
            <p className="cascade-template-text">Template chosen by</p>
            <div className="cascade-template-user">15,000+ users</div>
            <Link to="/resume" className="btn btn-red btn-outline">
              <span className="btn-text">use this resume template</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CascadeTemplate;
