document.addEventListener("DOMContentLoaded", () => {

  // --- UI Elements ---
  const menuLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('pageTitle');
  
  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  // --- SPA Navigation ---
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active link
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Update page title
      pageTitle.textContent = link.textContent.trim();
      
      // Show corresponding section
      const targetId = link.getAttribute('data-target');
      sections.forEach(sec => {
        if(sec.id === targetId) {
          sec.classList.add('active');
        } else {
          sec.classList.remove('active');
        }
      });
      
      // Close sidebar on mobile after clicking
      if (window.innerWidth <= 992) {
        sidebar.classList.remove('show');
      }
    });
  });

  // --- Mobile Sidebar Toggle ---
  mobileToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // --- Logout ---
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.addEventListener('click', () => {
    window.location.href = 'student-portal.html';
  });

  // --- State Data ---
  let courses = [
    { code: 'CSC201', title: 'Data Structures', units: 3, status: 'Registered' },
    { code: 'CSC203', title: 'Algorithms', units: 3, status: 'Registered' },
    { code: 'MTH201', title: 'Linear Algebra', units: 2, status: 'Pending' }
  ];

  let timetable = [
    { course: 'CSC201', day: 'Monday', time: '10:00 AM' },
    { course: 'MTH201', day: 'Wednesday', time: '02:00 PM' },
    { course: 'CSC203', day: 'Friday', time: '11:00 AM' }
  ];

  // --- Render Functions ---
  const renderCourses = () => {
    const tbody = document.querySelector('#course-table tbody');
    tbody.innerHTML = '';
    courses.forEach(c => {
      const badgeClass = c.status === 'Registered' ? 'a' : 'c';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.code}</strong></td>
        <td>${c.title}</td>
        <td>${c.units}</td>
        <td><span class="badge ${badgeClass}">${c.status}</span></td>
      `;
      tbody.appendChild(tr);
    });
  };

  const renderTimetable = () => {
    const tbody = document.querySelector('#timetable-table tbody');
    if(!tbody) return; // if it doesn't exist yet
    tbody.innerHTML = '';
    timetable.forEach((t, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${t.course}</strong></td>
        <td>${t.day}</td>
        <td>${t.time}</td>
        <td><button style="color: var(--danger); background:none; border:none; cursor:pointer;" onclick="removeTime(${i})"><i class="fas fa-trash"></i></button></td>
      `;
      tbody.appendChild(tr);
    });
  };

  // Assign to window to make it accessible in inline onclick
  window.removeTime = (index) => {
    timetable.splice(index, 1);
    renderTimetable();
  };

  // --- Form Submissions ---
  
  // Add Course
  document.getElementById('course-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('courseCode').value.trim().toUpperCase();
    const title = document.getElementById('courseTitle').value.trim();
    const units = document.getElementById('courseUnits').value;
    
    if(code && title && units) {
      courses.push({ code, title, units, status: 'Pending' });
      renderCourses();
      document.getElementById('course-form').reset();
    }
  });

  // Add Timetable
  document.getElementById('time-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const course = document.getElementById('timeCourse').value.trim().toUpperCase();
    const day = document.getElementById('timeDay').value.trim();
    const time = document.getElementById('timeTime').value.trim();
    
    if(course && day && time) {
      timetable.push({ course, day, time });
      renderTimetable();
      document.getElementById('time-form').reset();
    }
  });

  // --- Initial Render ---
  renderCourses();
  renderTimetable();
});
