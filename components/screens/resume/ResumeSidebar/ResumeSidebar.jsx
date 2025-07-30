'use client'
import { useRouter } from "next/navigation";
import  Images  from "../../../../public/assets/images/logo.png";
import "./ResumeSidebar.scss";

const ResumeSidebar = () => {
  const { pathname} = useRouter();
  console.log(pathname);

  return (
    <div className="resume-sidebar">
      <div className="sidebar-brand py-2">
        <img src={Images} alt="" />
        <span className="">Resume Maker</span>
      </div>

      <div className="sidebar-steps">
        <div className="step-item">
          <div
            className={`step-item-count ${
              pathname?.startsWith("/resume/contact") ? "active" : ""
            }`}
          >
            1 <p className="step-item-text">Heading</p>
          </div>
          <div className="step-item-line"></div>
        </div>
        <div className="step-item">
          <div
            className={`step-item-count ${
              pathname?.startsWith("/resume/education") ? "active" : ""
            }`}
          >
            2 <p className="step-item-text">Education</p>
          </div>
          <div className="step-item-line"></div>
        </div>
        <div className="step-item">
          <div
            className={`step-item-count ${
              pathname?.startsWith("/resume/workhistory")
                ? "active"
                : ""
            }`}
          >
            3<p className="step-item-text">Work History</p>
          </div>
          <div className="step-item-line"></div>
        </div>
        <div className="step-item">
          <div className={`step-item-count ${pathname?.startsWith("/resume/skill") ? "active" : ""}`}>
            4 <p className="step-item-text">Skills</p>
          </div>
          <div className="step-item-line"></div>
        </div>
        <div className="step-item">
          <div className={`step-item-count ${pathname?.startsWith("/resume/summary") ? "active" : ""}`}>
            5<p className="step-item-text">Summary</p>
          </div>
          <div className="step-item-line"></div>
        </div>
        <div className="step-item">
          <div className={`step-item-count ${pathname?.startsWith("/resume/extra") ? "active" : ""}`}>
            6<p className="step-item-text">Finalize</p>
          </div>
          <div className="step-item-line"></div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSidebar;
