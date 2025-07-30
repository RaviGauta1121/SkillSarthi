import { Link } from "react-router-dom";
import "./Banner.scss";
import { CgNotes } from "react-icons/cg";
import { Images } from "../../../../assets/images";

const Banner = () => {
  return (
    <section
      className="banner"
      style={{
        background: `url(${Images.HomeBanner}) center/cover no-repeat`,
      }}
    >
      <div className="container">
        <div className="banner-wrap">
          <h2 className="banner-ttl">Resumio Resume Builder</h2>
          <h3 className="banner-lead">
            Professional Resume Tool To Get Ready For Job
          </h3>
          <Link to="/how_it_works" className="btn btn-red">
            <span className="btn-icon">
              <CgNotes size={24} />
            </span>
            <span className="btn-text">try our resume builder</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Banner;
