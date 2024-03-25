type RosterOutput = { [key: number]: string[] };

export class GradeSchool {
  private students: Map<number, string[]> = new Map();

  roster(): RosterOutput {
    const roster: RosterOutput = {};

    this.students.forEach((students: string[], grade: number) => {
      roster[grade] = [...students.sort()]
    });

    return roster;
  }

  add(student: string, grade: number): void {
    [...this.students].find(([currentGrade, students]) => {
      const remainingStudents = students.filter((s: string) => s !== student);
      this.students.set(currentGrade, remainingStudents);
    });

    const students = this.students.get(grade) || [];

    students.push(student);
    this.students.set(grade, students);
  }

  grade(grade: number): string[] {
    const students = this.students.get(grade) || [];
    return [...students.slice().sort()];
  }
}
