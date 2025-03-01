import React, { useState } from "react";
import VideoCourses from "@/components/courses/VideoCourses";
import CourseMaterial from "@/components/courses/CourseMaterial";

const Courses = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  const handleCourseSelect = (courseId: number) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  return (
    <div>
      {selectedCourseId ? (
        <CourseMaterial
          courseId={selectedCourseId}
          onBack={handleBackToCourses}
        />
      ) : (
        <VideoCourses onCourseSelect={handleCourseSelect} />
      )}
    </div>
  );
};

export default Courses;
