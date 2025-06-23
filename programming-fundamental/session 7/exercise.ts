/**
 * Create a function to find a factorial number using recursion
 * Example
 * Input :  5
 * Output: 5! = 5 x 4 x 3 x 2 x 1 = 120
 * solution by michael
 */

function factorial(n: number): number {
    //base case
    if (n == 0) {
        return 0
    }
    if (n == 1) {
        return 1
    }
    //recursive case
    return n * factorial(n-1)
}

console.log(factorial(5))

/**
 * Create a function that can accept input as an array of objects and switch all values into property and property into value
 * Example : 
 * Input : [{ name: ‘David’, age: 20 }]
 * Output : [{ David: ‘name’, 20: ‘age’}]
 */

function swapPropertyValue(arr: Record<string | number, string | number>[]): Record<string | number, string | number>[] {
  return arr.map(obj => {
    let result = {}
    Object.entries(obj).forEach(([key, value]) => {
      result = { ...result, [value]: key }
    })
    return result
  })
}

console.log(swapPropertyValue([{ name: 'David', age: 20 }, { name: 'Alven', age: 29 }]))

/**
 * Create a function to merge two array of student data and remove duplicate data
 * Student data : name & email
 * Example : 
 * Array1 → [
 * { name: ‘Student 1’, email : ‘student1@mail.com’  }, 
 * { name: ‘Student 2’, email : ‘student2@mail.com’  }
 * ]
 * Array2 → [
 * { name: ‘Student 1’, email : ‘student1@mail.com’  }, 
 * { name: ‘Student 3’, email : ‘student3@mail.com’  }
 * ]
 * Result : 
 * ArrayResult → [
 * { name: ‘Student 1’, email : ‘student1@mail.com’  }, 
 * { name: ‘Student 2’, email : ‘student2@mail.com’  },
 * { name: ‘Student 3’, email : ‘student3@mail.com’  }

 * solution by chin
 */

// combine 2 arrays
// create empty array to store unique object
// create empty array for result
// loop through the combined array, check with unique object, push to result array
// return result array

type StudentData = {
  name: string;
  email: string;
};

const removeDuplicateData = (arr1: StudentData[], arr2: StudentData[]) => {
  const result: StudentData[] = [];

  for (const studentData1 of arr1) {
    let duplicateIndex = [];
    for (const [index, studentData2] of arr2.entries()) {
      if (
        studentData2.email === studentData1.email &&
        studentData2.name === studentData1.name
      ) {
        duplicateIndex.push(index);
      }
    }
    result.push(studentData1);

    // removing arr2 data which same like arr1, so u dont need to check it twice when loop the arr2
    for (const badIndex of duplicateIndex) {
      arr2.splice(badIndex, 1);
    }
  }

  for (const studentData2 of arr2) {
    result.push(studentData2);
  }

  return result;
};

const arr1 = [
  { name: "Student1", email: "student1@mail.com" },
  { name: "Student2", email: "student2@mail.com" },
];
const arr2 = [
  { name: "Student1", email: "student1@mail.com" },
  { name: "Student3", email: "student3@mail.com" },
];

console.log(removeDuplicateData(arr1, arr2));
