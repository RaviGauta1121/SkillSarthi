import ResumeSidebar from "../../components/screens/resume/ResumeSidebar/ResumeSidebar";

const ResumeLayout = ({ children }) => {
  return (
    <div className="pg-resume-container">
      <ResumeSidebar />
      <div className="resume-wrapper">
        {children}
      </div>
    </div>
  );
};

export default ResumeLayout;