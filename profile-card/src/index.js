import React from 'react';
import ReactDOM from 'react-dom/client';
import "./styles.css";

// Perl, JavaScript, Node, CSS, HTML, SQL, SSIS, C#, C++

const skillSet = [
  {
    name: "Perl",
    level: "advanced",
    color: "#2257e6",
  },
  {
    name: "JavaScript",
    level: "beginner",
    color: "#ebd317",
  },
  {
    name: "Node",
    level: "beginner",
    color: "#b9d7a3",
  },
  {
    name: "HTML",
    level: "intermediate",
    color: "#e5452c",
  },
  {
    name: "SSIS",
    level: "beginner",
    color: "#53d4f7",
  },
  {
    name: "C#",
    level: "intermediate",
    color: "#fd3401",
  },
  {
    name: "C++",
    level: "beginner",
    color: "#2257e6",
  },
  {
    name: "CSS",
    level: "beginner",
    color: "#ebd317",
  },
  {
    name: "SQL",
    level: "intermediate",
    color: "#b9d7a3",
  },
];

function App() {
 
  return (
    <div className="card">
      <Avatar 
        image="avatar_2.jpg"
      />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar(props) {
  return <img src={props.image} alt={props.image} className='avatar'/>
}

function Intro() {
  return (
    <div>
      <h1>Matthew Salvage</h1>
      <p>Qualified and driven IT professional with over 13 years of commercial development, team leading, management and project management experience in various industries including Share Registry, Health Insurance, Financial and Banking, Superannuation, Utilities, Government and training.</p>
      <p>   </p>
      <p>Seeking a role with a community conscious and innovative organisation where I can use my existing skills to make a meaningful contribution.</p>
      <p></p>
    </div>
  );
}

function SkillList() {
  const skills = skillSet.map((skill, index) =>
      <Skill skill={skill.name} color={skill.color} level={skill.level} index={index} />
  );
  return <ul className='skill-list'>{skills}</ul>;
}

function Skill ({skill, color, level, index}) {
  
  return (
    <li key={index} className='skill' style={{backgroundColor: color}}>
      <span>{skill}</span>
      <span>
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👍"}
        {level === "advanced" && "💪"}
      </span>
    </li>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
