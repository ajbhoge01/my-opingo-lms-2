// components/Courses.js
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await axios.get('https://my-opigno-site.ddev.site/jsonapi/group/opigno_course');
        console.log('Fetched Data:', res.data.data); // 🔍 see console

        setCourses(res.data.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    }

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Opigno Courses</h2>
      {courses.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {courses.map(course => (
            <li key={course.id}>
              <h3>{course.attributes.label}</h3>
              <div
                dangerouslySetInnerHTML={{ __html: course.attributes.field_course_description.processed }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
