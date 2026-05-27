document.addEventListener("DOMContentLoaded", () => {

  // --- UI Elements ---
  const menuLinks = document.querySelectorAll('.menu a');
  const sections = document.querySelectorAll('.section');
  
  const mobileToggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('sidebar');

  // --- SPA Navigation ---
  menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Update active link
      menuLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
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
    window.location.href = 'school-portal.html';
  });

  // --- Mock Data ---
  let students = [
    { name: 'Alex Johnson', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&w=100&q=80', email: 'alex.j@vareya.edu.ng', matric: 'VU/23/1029', dept: 'Computer Science', level: '300', cgpa: 3.84 },
    { name: 'Mary Cole', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&w=100&q=80', email: 'mary.c@vareya.edu.ng', matric: 'VU/23/1045', dept: 'Medicine', level: '200', cgpa: 4.12 },
    { name: 'David Smith', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&w=100&q=80', email: 'david.s@vareya.edu.ng', matric: 'VU/22/0890', dept: 'Accounting', level: '400', cgpa: 2.95 }
  ];

  let courses = [
    { code: 'CSC201', title: 'Data Structures', units: 3, lecturer: 'Prof. A. Smith' },
    { code: 'MTH201', title: 'Linear Algebra', units: 2, lecturer: 'Dr. C. Kent' },
    { code: 'ENG101', title: 'Use of English', units: 2, lecturer: 'Dr. B. Wayne' }
  ];

  // --- Render Functions ---
  const renderStudents = () => {
    const tbody = document.querySelector('#admin-student-table tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    students.forEach((s, index) => {
      let cgpaColor = s.cgpa >= 3.5 ? 'var(--success)' : s.cgpa >= 2.0 ? 'var(--warning)' : 'var(--danger)';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="user-cell">
            <img src="${s.img}" alt="${s.name}">
            <div>
              <strong>${s.name}</strong>
              <small>${s.email}</small>
            </div>
          </div>
        </td>
        <td>${s.matric}</td>
        <td>${s.dept}</td>
        <td>${s.level}</td>
        <td><strong style="color: ${cgpaColor}">${s.cgpa}</strong></td>
        <td>
          <button style="color: var(--primary); background:none; border:none; cursor:pointer; margin-right: 10px;"><i class="fas fa-edit"></i></button>
          <button style="color: var(--danger); background:none; border:none; cursor:pointer;" onclick="removeStudent(${index})"><i class="fas fa-trash"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  };

  const renderCourses = () => {
    const tbody = document.querySelector('#admin-course-table tbody');
    if(!tbody) return;
    tbody.innerHTML = '';
    
    courses.forEach((c, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${c.code}</strong></td>
        <td>${c.title}</td>
        <td>${c.units}</td>
        <td>${c.lecturer}</td>
      `;
      tbody.appendChild(tr);
    });
  };

  // Assign global window functions for inline onclicks
  window.removeStudent = (index) => {
    if(confirm("Are you sure you want to remove this student?")) {
      students.splice(index, 1);
      renderStudents();
    }
  };

  // --- Add Course Form ---
  const courseForm = document.getElementById('admin-course-form');
  if(courseForm) {
    courseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('ac-code').value.trim().toUpperCase();
      const title = document.getElementById('ac-title').value.trim();
      const units = document.getElementById('ac-units').value;
      const lecturer = document.getElementById('ac-lecturer').value;
      
      if(code && title) {
        courses.unshift({ code, title, units, lecturer });
        renderCourses();
        courseForm.reset();
        alert(`Course ${code} added successfully.`);
      }
    });
  }

  // Initial renders
  renderStudents();
  renderCourses();
});
