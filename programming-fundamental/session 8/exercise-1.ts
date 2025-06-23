/**
 * Specifications :
  Create a program to calculate total salary based on employee type
    There are two types of employee : full-time & part-time
    Salary for full-time employee : 
    IDR 100.000 / hour
    IDR 75.000 / hour, if the number of working hours per day is more than 6 hours
    Salary for part-time employee : 
    IDR 50.000 / hour
    IDR 30.000 / hour, if the number of working hours per day is more than 6 hours
  Requirements :
    Create an Employee as a parent class
    Create a FulltimeEmployee and ParttimeEmployee as a child of Employee class
    Create a method in that class to add working hour per day
    Create a method in that class to calculate total salary
  Use inheritance concept
 */

class Employee {
  protected workingHour = 0;

  constructor() {}

  public addWorkingHours(hour: number) {
    this.workingHour = this.workingHour + hour;
  }

  public calcTotalSalary() {
    // to be implemented
  }
}

class FullTimeEmployee extends Employee {
  constructor() {
    super();
  }
  
  public calcTotalSalary(): number {
    if (this.workingHour >= 6) {
      return 6 * 100000 + (this.workingHour - 6) * 75000;
    } else {
      return this.workingHour * 100000;
    }
  }
}

class PartTimeEmployee extends Employee {
  constructor() {
    super();
  }

  public calcTotalSalary(): number {
    if (this.workingHour > 6) {
      return 6 * 50000 + (this.workingHour - 6) * 30000;
    } else {
      return this.workingHour * 50000;
    }
  }
}

const fullTimeEmployee = new FullTimeEmployee()
fullTimeEmployee.addWorkingHours(3);
console.log('Full time employee salary:')
console.log(fullTimeEmployee.calcTotalSalary())

const partTimeEmployee = new PartTimeEmployee()
partTimeEmployee.addWorkingHours(3);
partTimeEmployee.addWorkingHours(10);
console.log('Part time employee salary:')
console.log(partTimeEmployee.calcTotalSalary())

