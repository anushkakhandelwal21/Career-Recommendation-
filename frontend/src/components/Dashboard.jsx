import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="dash-container1">
          <h1 className="dashboard-title">Welcome to Career Wise!</h1>
          <p className="dashboard-desc">
          Are you feeling uncertain about your career choices?
            <br />
            Unlock Your Career Potential with Personalized Recommendations!
          
          </p>
        </div>
        <div className="dash-container2">
          <div className="dash-container2-div1">
            <h2>How It Works</h2>
          </div>
          <div className="dash-container2-div2">
            <ul>
              
              <li>
                <u>Assessment:</u>
                <br />
                Our advanced assessment tools analyze your profile to identify
                your strengths and areas for growth.
              </li>
              <li>
                <u>Personalized Recommendations:</u>
                <br />
                Receive tailored career recommendations based on your unique
                profile and assessment results.
              </li>
            </ul>
          </div>
          <div>
            <a href="/test" className="test-btn">Take Test</a>
          </div>
        </div>
      </div>
    </>
  );
}