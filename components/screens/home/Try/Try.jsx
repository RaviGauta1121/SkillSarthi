import { Link } from "react-router-dom";
import "./Try.scss";
import { Images } from "../../../../assets/images";

const Try = () => {
  return (
    <section
      className="try"
      style={{
        background: `url(${Images.TryTriangle})`,
      }}
    >
      <div className="container">
        <div className="try-wrap">
          <h3 className="try-ttl">
            Try Resumio professional resume builder now
          </h3>
          <Link to="/how_it_works" className="btn btn-white">
            <span className="btn-text">try our resume maker</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Try;
