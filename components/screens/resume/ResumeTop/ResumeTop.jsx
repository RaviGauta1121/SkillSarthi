import { FaArrowLeft } from "react-icons/fa6";
import "./ResumeTop.scss";
import { PropTypes } from "prop-types";
import Link from "next/link";

const ResumeTop = ({ goBackRoute }) => {
  return (
    <div className="resume-block-top">
      <Link href={goBackRoute} className="link link-blue">
        <span className="link-icon">
          <FaArrowLeft size={12} />
        </span>
    
      </Link>
    </div>
  );
};

export default ResumeTop;

ResumeTop.propTypes = {
  goBackRoute: PropTypes.string,
};
