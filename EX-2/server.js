// server.js
import express from 'express';
import courses from "./course.js";
import acceptQuery from './acceptQuery.js';
import validateQuery from './validateQuery.js';
import authorized from './authorized.js';

const app = express();
const PORT = 3000;

// Global middleware
app.use(acceptQuery());

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses',authorized(), validateQuery(), (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    let results = courses.filter(course => course.department === dept);
    
    if(level) results = results.filter(course => course.level === level);
    if(minCredits) results = results.filter(course => course.credits >= parseInt(minCredits));
    if(maxCredits) results = results.filter(course => course.credits <= parseInt(maxCredits));
    if(semester) results = results.filter(course => course.semester === semester);
    if(instructor){
        results = results.filter(course => 
            course.instructor.toLowerCase().includes(instructor.toLowerCase())
        );
    }

    res.json({ results, meta: { total: results.length } });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
