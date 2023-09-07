import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useParams } from "react-router-dom";
import bcrypt from "bcryptjs";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import $ from "jquery";
import HomePage from "./scenes/homePage";
import ribbon from "./assets/ribbon.png";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  const navigate = useNavigate();

  const handleSignUp = async (username, password) => {
    try {
      const checkUsername = await axios.post(
        "http://localhost:3080/api/checkUsername",
        { username }
      );
      if (checkUsername.data.message === "Username already exists") {
        toast.error("Username already exists", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await axios.post("http://localhost:3080/api/signup", {
        username,
        password: hashedPassword,
      });
      alert(newUser.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Error creating user", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogin = async (username, password, onSuccess, onFailure) => {
    try {
      const user = await axios.post("http://localhost:3080/api/login", {
        username,
        password,
      });
      if (user.data.error) {
        onFailure();
        toast.error("User not found or invalid password.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        const { remainingAttempts, lockoutTime } = user.data;
        if (remainingAttempts === 0) {
          const minutes = Math.ceil(lockoutTime / 60000); // Convert milliseconds to minutes
          toast.info(`You are locked out. Please try again in 5 minutes.`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(user.data));

      setLoggedInUser(user.data);
      onSuccess();
      if (user.data.isAdmin) {
        navigate("/admin");
      } else {
        navigate(`/user/${username}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setLoggedInUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <ToastContainer />
      <div className="page">
        <nav className="page__menu menu">
          <div className="menu__wrapper">
            <ul className="menu__list r-list">
              {loggedInUser ? null : (
                <li className="menu__group">
                  <Link to="/" className="menu__link r-link text-underlined">
                    APMS
                  </Link>
                </li>
              )}
              {loggedInUser ? (
                <>
                  {loggedInUser.isAdmin ? (
                    <li className="menu__group">
                      <Link
                        to="/admin"
                        className="menu__link r-link text-underlined"
                      >
                        Admin Portal
                      </Link>
                      <Link
                        to="/admin/report"
                        className="menu__link r-link text-underlined"
                      >
                        Report Generation
                      </Link>
                    
                    
                    
                    </li>
                     
                  
                  
                  ) : (
                    <li className="menu__group">
                      <Link
                        to={`/user/${loggedInUser.username}`}
                        className="menu__link r-link text-underlined"
                      >
                        User Portal
                      </Link>
                    </li>
                  )}
                </>
              ) : null}
            </ul>
            {loggedInUser && (
              <button
                onClick={handleLogout}
                className="menu__link r-link text-underlined logout-button"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin/*"
          element={<AdminPortal loggedInUser={loggedInUser} />}
        />
        <Route
          path="/user/:username"
          element={<UserPortal loggedInUser={loggedInUser} />}
        />
        <Route
          path="/user/:username/upload-certificate"
          element={<UploadCertificate loggedInUser={loggedInUser} />}
        />
        <Route
          path="/user/:username/view-certificate"
          element={<ViewCertificate loggedInUser={loggedInUser} />}
        />
        <Route
          path="/login"
          element={<LoginForm handleLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpForm handleSignUp={handleSignUp} />}
        />

        <Route
          path="/admin/user/:username"
          element={<UserPage navigate={navigate} loggedInUser={loggedInUser} />}
        />
        <Route path="/admin/newPage1" element={<NewPage1 loggedInUser={loggedInUser} />} />

        <Route path="/admin/newPage2" element={<NewPage2 loggedInUser={loggedInUser} />} />

        <Route path="/admin/report" element={<Report loggedInUser={loggedInUser} />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

function Home() {
  const [loggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );
  return (
    <div>
      <HomePage />
      <div className="homeButton">
        {!loggedInUser ? (
          <>
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
}



function Report({loggedInUser}) {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.isAdmin) {
      navigate("/");
    }
    fetchUsers();
  }, [loggedInUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3080/api/users");
      const filteredUsers = response.data.users.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };
  return(

      <div className="ccontainer">
      <ul className="responsive-table">
          <li className="table-header1">
          
            <div className="col col-11">Students</div>
            <div className="col col-12">Certificates Pending</div>
            <div className="col col-12">Approved</div>
            <div className="col col-12">Rejected</div>
            <div className="col col-12">Semester 1</div>
            <div className="col col-12">Semester 2</div>
            <div className="col col-12">Semester 3</div>
            <div className="col col-12">Semester 4</div>
            <div className="col col-12">Semester 5</div>
            <div className="col col-12">Semester 6</div>
            <div className="col col-12">Semester 7</div>
            <div className="col col-12">Semester 8</div>
            <div className="col col-12">Sports</div>
            <div className="col col-12">NCC/NSS</div>
            <div className="col col-12">Music/Performing Arts</div>
          </li>
      
          {filteredUsers.map((user) => (
        <li className="table-row1" key={user._id}>  
            <div className="col col-11">{user.username}</div>
            <div className="col col-12">{user.pendingImageCount}</div>
            <div className="col col-12">{user.acceptedImageCount}</div>
            <div className="col col-12">{user.rejectedImageCount}</div>
            <div className="col col-12">{user.semester1}</div>
            <div className="col col-12">{user.semester2}</div>
            <div className="col col-12">{user.semester3}</div>
            <div className="col col-12">{user.semester4}</div>
            <div className="col col-12">{user.semester5}</div>
            <div className="col col-12">{user.semester6}</div>
            <div className="col col-12">{user.semester7}</div>
            <div className="col col-12">{user.semester8}</div>
            <div className="col col-12">{user.sports}</div>
            <div className="col col-12">{user.ncc}</div>
            <div className="col col-12">{user.music}</div>
            </li>
      ))}
     
    </ul>
  </div>
    
  );

}





function NewPage1({ loggedInUser }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersWithPendingImageCount, setUsersWithPendingImageCount] = useState([]);
  const [selectedDropdown1, setSelectedDropdown1] = useState(""); // New state for selected dropdown1 value

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.isAdmin) {
      navigate("/");
    }
    fetchUsers();
  }, [loggedInUser, navigate]);

  const handleDropdownChange = (event) => {
    setSelectedDropdown1(event.target.value);
    filterUsersBySearchTerm(searchTerm, event.target.value); // Pass searchTerm and selected dropdown1 value to filter
  };

  const filterUsersBySearchTerm = (searchTerm, dropdown1Value) => {
    // Filter users based on searchTerm and selectedDropdown1 value
    const filtered = users.filter((user) => {
      const usernameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const dropdown1Match = !dropdown1Value || user.dropdown1 === dropdown1Value;
      return usernameMatch && dropdown1Match;
    });
    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  useEffect(() => {
    fetchUsers(selectedDropdown1); // Fetch users initially and whenever the dropdown1 value changes
  }, [selectedDropdown1]);

  const fetchUsers = async (dropdown1Value) => {
    try {
      const response = await axios.get("http://localhost:3080/api/users1", {
        params: { dropdown1: dropdown1Value },
      });
      const filteredUsers = response.data.users.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="adminportal">
      <h2>Welcome, {loggedInUser.username}</h2>
      <div className="searchBody2">
      <div className="search__container">
        <input className="search__input"
          type="text"
          placeholder="Search username"
          value={searchTerm}
          onChange={handleSearch}
        /></div>
      </div>
        <div className="search_bar">
        <select value={selectedDropdown1} onChange={handleDropdownChange}>
          <option value="">SEMESTER</option>
          <option value="s1">s1</option>
          <option value="s2">s2</option>
          <option value="s3">s3</option>
          <option value="s4">s4</option>
          <option value="s5">s5</option>
          <option value="s6">s6</option>
          <option value="s7">s7</option>
          <option value="s8">s8</option>
        </select>
      </div>
      <div className="users_body">
        <article className="leaderboard">
          <header>
            <h1 className="leaderboard__title">
              <span className="leaderboard__title--top students">Students</span>
              <span className="leaderboard__title--top certificates">Certificates Pending</span>
            </h1>
          </header>
          <main className="leaderboard__profiles">
            {filteredUsers.map((user) => (
              <Link to={`/admin/user/${user.username}`} key={user._id}>
                <article className="leaderboard__profile">
                  <span className="leaderboard__name">{user.username}</span>
                  <span className="leaderboard__value">{user.pendingImageCount}</span>
                </article>
              </Link>
            ))}
          </main>
        </article>
      </div>
    </div>
  );
}




function NewPage2({ loggedInUser }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersWithPendingImageCount, setUsersWithPendingImageCount] = useState([]);
  const [selectedDropdown1, setSelectedDropdown1] = useState(""); // New state for selected dropdown1 value

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.isAdmin) {
      navigate("/");
    }
    fetchUsers();
  }, [loggedInUser, navigate]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };


  const handleDropdownChange = (event) => {
    setSelectedDropdown1(event.target.value);
    filterUsersBySearchTerm(searchTerm, event.target.value); // Pass searchTerm and selected dropdown1 value to filter
  };

  const filterUsersBySearchTerm = (searchTerm, dropdown1Value) => {
    // Filter users based on searchTerm and selectedDropdown1 value
    const filtered = users.filter((user) => {
      const usernameMatch = user.username.toLowerCase().includes(searchTerm.toLowerCase());
      const dropdown1Match = !dropdown1Value || user.dropdown1 === dropdown1Value;
      return usernameMatch && dropdown1Match;
    });
    setFilteredUsers(filtered);
  };

  useEffect(() => {
    fetchUsers(selectedDropdown1); // Fetch users initially and whenever the dropdown1 value changes
  }, [selectedDropdown1]);

  const fetchUsers = async (dropdown1Value) => {
    try {
      const response = await axios.get("http://localhost:3080/api/users2", {
        params: { dropdown1: dropdown1Value },
      });
      const filteredUsers = response.data.users.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminportal">
      <h2>Welcome, {loggedInUser.username}</h2>
      <div className="searchBody3">
      <div className="search__container">
      
        <input className="search__input"
          type="text"
          placeholder="Search username"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div></div>
      <div className="search_bar">
        <select value={selectedDropdown1} onChange={handleDropdownChange}>
          <option value="">TYPE</option>
          <option value="SPORTS">SPORTS</option>
          <option value="NCC\NSS">NCC/NSS</option>
          <option value="MUSIC/PERFORMING ARTS">MUSIC/PERFORMING ARTS</option> 
        </select>
      </div>
      
      <div className="users_body">
        <article className="leaderboard">
          <header>
            <h1 className="leaderboard__title">
              <span className="leaderboard__title--top students">Students</span>
              <span className="leaderboard__title--top certificates">Certificates Pending</span>
            </h1>
          </header>
          <main className="leaderboard__profiles">
            {filteredUsers.map((user) => (
              <Link to={`/admin/user/${user.username}`} key={user._id}>
                <article className="leaderboard__profile">
                  <span className="leaderboard__name">{user.username}</span>
                  <span className="leaderboard__value">{user.pendingImageCount}</span>
                </article>
              </Link>
            ))}
          </main>
        </article>
      </div>
    </div>
  );
}







function AdminPortal({ loggedInUser }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersWithPendingImageCount, setUsersWithPendingImageCount] = useState([]);
  const [usersWithAcceptedImageCount, setUsersWithAcceptedImageCount] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser || !loggedInUser.isAdmin) {
      navigate("/");
    }
    fetchUsers();
  }, [loggedInUser, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3080/api/users");
      const filteredUsers = response.data.users.filter((user) => !user.isAdmin);
      setUsers(filteredUsers);
      setFilteredUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsersWithPendingImageCount();
  }, []);

  const fetchUsersWithPendingImageCount = async () => {
    try {
      const response = await axios.get("http://localhost:3080/api/users/pendingImageCount");
      setUsersWithPendingImageCount(response.data.users);

    } catch (error) {
      console.error('Error fetching users with pending image count:', error);
    }
  };
  
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  
  return (
    <div className="adminportal">
      <h2>Welcome, {loggedInUser.username}</h2>
      <div className="users_body">
        <div className="searchBody">
          <div className="search__container">
            <input
              className="search__input"
              type="text"
              placeholder="Search Student"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="report">
        
      </div>
        
        <div className="searchfilters">
        <button onClick={() => navigate("/admin/newPage1")}>Search by Semester</button>
        <button onClick={() => navigate("/admin/newPage2")}>Search by Category</button>
      </div>
        <article className="leaderboard">
          <header>
            <h1 className="leaderboard__title">
              <span className="leaderboard__title--top students">Students</span>
              <span className="leaderboard__title--top certificates">Certificates Pending</span>
              <span className="leaderboard__title--top certificates">Approved</span>
            </h1>
          </header>
          <main className="leaderboard__profiles">
            {filteredUsers.map((user) => (
              <Link className="link-no-underline" to={`/admin/user/${user.username}`} key={user._id}>
                <article className="leaderboard__profile">
                  <span className="leaderboard__name">{user.username}</span>
                  <span className="leaderboard__value">{user.pendingImageCount}</span>
                  <span className="leaderboard__value2">{user.acceptedImageCount}</span>
                </article>
              </Link>
            ))}
          </main>
        </article>
      </div>
    </div>
  );
}



function UserPage({ navigate, loggedInUser }) {
  const { username } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3080/api/user/${username}`
      );
      const { imageData } = response.data;
      setImages(imageData || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    navigate("/admin/users");
  };

  const handleImageClick = (imageName) => {
    window.open(`http://localhost:3080/api/image/${username}/${imageName}`);
  };

  const handleStatusChange = async (imageName, status) => {
    try {
      await axios.put(
        `http://localhost:3080/api/user/${username}/image/${imageName}`,
        { status }
      );
      fetchImages(); // Fetch the updated images after status change
    } catch (error) {
      console.error(error);
      toast.error("Error updating status", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="ccontainer">
      <h2 className="user_title">STUDENT: {username}</h2>


      
      {images.length ? (
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Img Name</div>
            <div className="col col-2">Semester</div>
            <div className="col col-3">Organisation</div>
            <div className="col col-4">Name</div>
            <div className="col col-5">Issue Date</div>
            <div className="col col-6">Issuer</div>
            <div className="col col-7">Activity Points</div>
            <div className="col col-8">Status</div>
            
          </li>

          {images.map((image, index) => (
             <li className="table-row" key={index}>
              <div className="col col-1" data-label="Img Name"
                  onClick={() => handleImageClick(image.imageName)}
                >
                  {image.imageName}
              </div>
              <div className="col col-2" data-label="Semester">{image.dropdown1}</div>
              <div className="col col-3" data-label="Organisation">{image.dropdown2}</div>
              <div className="col col-4" data-label="Name">{image.certificateDetails.name}</div>
              <div className="col col-5" data-label="Issue Date">{image.certificateDetails.issueDate}</div>
              <div className="col col-6" data-label="Issuer">{image.certificateDetails.issuer}</div>
              <div className="col col-7" data-label="Activity Points">{image.activityPoints}</div>

              {loggedInUser && loggedInUser.isAdmin && (

                



                <><div className="col col-8" data-label="Status">
                  <label htmlFor={`status-select-${index}`}></label>
                  <select
                    id={`status-select-${index}`}
                    value={image.status}
                    onChange={(e) => handleStatusChange(image.imageName, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div></>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}


function UserPortal({ loggedInUser }) {
  const navigate = useNavigate();
  const username = loggedInUser ? loggedInUser.username : "";
  const [totalActivityPoints, setTotalActivityPoints] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [approvedCertificates, setApprovedCertificates] = useState(0);

  useEffect(() => {
    if (!loggedInUser || loggedInUser.isAdmin) {
      navigate("/");
    } else {
      fetchUserData();
    }
  }, [loggedInUser, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3080/api/user/${username}/data`
      );
      const { totalActivityPoints, totalCertificates, approvedCertificates } =
        response.data;
      setTotalActivityPoints(totalActivityPoints);
      setTotalCertificates(totalCertificates);
      setApprovedCertificates(approvedCertificates);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="frame">
      <div className="center">
        <div className="profile">
          <div className="name">{username}</div>
          <div className="job">Student</div>

          <div className="actions">
            <Link className="btn" to={`/user/${username}/upload-certificate`}>
              Upload
            </Link>
            <Link className="btn" to={`/user/${username}/view-certificate`}>
              View
            </Link>
          </div>
        </div>

        <div className="stats">
          <div className="box">
            <span className="value">{totalCertificates}</span>
            <span className="parameter">Certificates</span>
          </div>
          <div className="box">
            <span className="value">{approvedCertificates}</span>
            <span className="parameter">Approved</span>
          </div>
          <div className="box">
            <span className="value">{totalActivityPoints}</span>
            <span className="parameter">Activity Points</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadCertificate({ loggedInUser }) {
  const [image, setImage] = useState(null);
  const [activityPoints, setActivityPoints] = useState(0);

  const [dropdownValues, setDropdownValues] = useState({
    dropdown1: "s1",
    dropdown2: "",
  });
  const [certificateData, setCertificateData] = useState({
    name: "",
    issueDate: "",
    issuer: "",
  });

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    let points = 0;
    if (name === "dropdown2") {
      if (value === "NCC/NSS") {
        points = 50;
      } else if (value === "SPORTS") {
        points = 60;
      } else if (value === "MUSIC/PERFORMING ARTS") {
        points = 70;
      }
    }

    setActivityPoints(points);
  };

  const handleCertChange = (event) => {
    const { name, value } = event.target;
    setCertificateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loggedInUser) {
      toast.error("User not logged in", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!image) {
      toast.warn("Please select an image", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    function assignValueBasedOnDate(dateValue, rangesList) {
      let resultValue = null;
      for (const range of rangesList) {
        const { start, end, value } = range;
        if (dateValue >= start && dateValue <= end) {
          resultValue = value;
          break;
        }
      }
    
      return resultValue;
    }

    const dateToCheck = new Date(certificateData.issueDate);
    const rangesList = [
      { start: new Date('2020-11-26'), end: new Date('2021-04-20'), value: "s1" },
      { start: new Date('2021-04-21'), end: new Date('2021-11-01'), value: "s2" },
      { start: new Date('2021-11-02'), end: new Date('2022-04-13'), value: "s3" },
      { start: new Date('2022-05-14'), end: new Date('2022-10-20'), value: "s4" },
      { start: new Date('2022-10-21'), end: new Date('2023-04-20'), value: "s5" },
      { start: new Date('2023-04-21'), end: new Date('2023-08-30'), value: "s6" },
      { start: new Date('2023-09-01'), end: new Date('2024-01-15'), value: "s7" },
      { start: new Date('2024-01-16'), end: new Date('2024-07-10'), value: "s8" },
      
      // Add more ranges and corresponding values as needed
    ];
    
    const newsemester = assignValueBasedOnDate(dateToCheck, rangesList);
    console.log(newsemester);
dropdownValues.dropdown1=newsemester;
console.log(dropdownValues.dropdown1);



    const formData = new FormData();
    formData.append("image", image);
    formData.append("username", loggedInUser.username);
    formData.append("dropdown1", dropdownValues.dropdown1);
    formData.append("dropdown2", dropdownValues.dropdown2);
    formData.append("name", certificateData.name);
    formData.append("issueDate", certificateData.issueDate);
    formData.append("issuer", certificateData.issuer);
    formData.append("activityPoints", activityPoints); // Add activityPoints to form data

    try {
      await axios.post("http://localhost:3080/api/uploadImage", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image uploaded successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="certcard">
      <img src={ribbon} />
      <h2 className="cert-heading">Certificate</h2>
      <div className="CertificateForm">
        <form onSubmit={handleSubmit}>
          <select
            name="dropdown1"
            value={dropdownValues.dropdown1}
            onChange={handleOptionChange}
          >
            <option value="s1">s1</option>
            <option value="s2">s2</option>
            <option value="s3">s3</option>
            <option value="s4">s4</option>
            <option value="s5">s5</option>
            <option value="s6">s6</option>
            <option value="s7">s7</option>
            <option value="s8">s8</option>
          </select>
          <select
            name="dropdown2"
            value={dropdownValues.dropdown2}
            onChange={handleOptionChange}
          >
            <option value="">Select an option</option>
            <option value="NCC/NSS">NCC/NSS</option>
            <option value="SPORTS">SPORTS</option>
            <option value="MUSIC/PERFORMING ARTS">MUSIC/PERFORMING ARTS</option>
          </select>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={certificateData.name}
              onChange={handleCertChange}
              required
            />
          </div>
          <div>
            <label htmlFor="issuer">Issuer:</label>
            <input
              type="text"
              id="issuer"
              name="issuer"
              value={certificateData.issuer}
              onChange={handleCertChange}
              required
            />
          </div>
          <div>
            <label htmlFor="issueDate">Date:</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={certificateData.issueDate}
              onChange={handleCertChange}
              required
            />
          </div>
          <input type="file" accept="image/jpeg" onChange={handleImageUpload} />
          <br />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}

function ViewCertificate({ loggedInUser }) {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3080/api/user/${loggedInUser.username}`
      );
      const { imageData } = response.data;
      setImageData(imageData || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (imageName) => {
    window.open(
      `http://localhost:3080/api/image/${loggedInUser.username}/${imageName}`
    );
  };

  return (
    <div className="viewcertificate">
      <center>
        <h2>VIEW CERTIFICATE</h2>
      </center>
      {imageData.length ? (
        <ul>
          <div className="certviewcard-container">
            {imageData.map((image, index) => (
              <div className="certviewcard">
                <ul key={index}>
                  {/* <p>Image Name: <span className="image-link" onClick={() => handleImageClick(image.imageName)}>{image.imageName}</span></p> */}
                  <p>Name: {image.certificateDetails.name}</p>
                  <p>Issuer: {image.certificateDetails.issuer}</p>
                  <p>Issue Date: {image.certificateDetails.issueDate}</p>
                  {/* <p>Status: {image.status}</p>
              <p>Semester: {image.dropdown1}</p>
              <p>Type: {image.dropdown2}</p> */}

                  {image.status === "accepted" && (
                    <p>Activity Points: {image.activityPoints}</p>
                  )}
                  <button type="View"  onClick={() => handleImageClick(image.imageName)} >View</button>
                  {/* <button className="delete">Delete</button> */}
                </ul>
                <div className="viewcertificatestatus">
                  <div className="vcbox">
                    <span className="value">{image.dropdown1}</span>
                    <span className="parameter">Semester</span>
                  </div>
                  <div className="vcbox">
                    <span className="value">{image.dropdown2}</span>
                    <span className="parameter">Type</span>
                  </div>
                  <div className="vcbox">
                    <span className="value">{image.status}</span>
                    <span className="parameter">Status</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      ) : (
        <p>No images found.</p>
      )}
    </div>
  );
}

function LoginForm({ handleLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password, handleLoginSuccess, handleLoginFailure);
  };

  const handleLoginSuccess = () => {
    setFailedAttempts(0);
  };

  const handleLoginFailure = () => {
    setFailedAttempts((prevAttempts) => prevAttempts + 1);

    if (failedAttempts + 1 >= 3) {
      toast.error("Maximum login attempts exceeded. Please try again later.", {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    }
  };

  return (
    <div className="card">
      <h2 className="card-heading">LOGIN</h2>
      <form className="LoginPage" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function SignUpForm({ handleSignUp }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.warn("Password must be at least 8 characters long.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      toast.warn(
        "Password must contain at least one uppercase letter and one lowercase letter.",
        {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }
    if (!/(?=.*\d)/.test(password)) {
      toast.warn("Password must contain a digit.", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    handleSignUp(username, password);
  };

  return (
    <div className="card">
      <h2 className="card-heading">SIGN UP</h2>
      <form className="LoginPage" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <div className="conditions">
        Password must contain 8 characters, at least one upper-case letter, one
        lower-case letter, and one digit.
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 Not Found</h1>
      <p>Oops! The page you're looking for does not exist.</p>
    </div>
  );
}

export default App;