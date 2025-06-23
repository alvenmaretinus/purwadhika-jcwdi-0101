class Student {
  Name: string;
  Email: string;
  Age: number;
  Score: number;

  constructor(name: string, email: string, age: number, score: number) {
    this.Name = name
    this.Email = email
    this.Age = age
    this.Score = score
  }
}

interface RetData {
    Highest: number
    Lowest: number
    Average: number
}



interface CountStudentsScoreRet {
    Score: RetData
    Age: RetData
}

function CountStudentsData (students: Array<Student>): CountStudentsScoreRet{
    let highestAge: number = 0
    let lowestAge: number = Infinity
    let sumAge: number = 0
    let highestScore: number = 0 // assuming scores start from 0
    let lowestScore: number = Infinity
    let sumScore: number = 0
    
    for (let student of students) {
        sumAge += student.Age
        sumScore += student.Score
        highestAge = Math.max(highestAge, student.Age)
        highestScore = Math.max(highestScore, student.Score)
        lowestAge = Math.min(lowestAge, student.Age)
        lowestScore = Math.min(lowestScore, student.Score)
    }

    return {
        Score: {
            Highest: highestScore,
            Lowest: lowestScore,
            Average: sumScore/students.length
        },
        Age: {
            Highest: highestAge,
            Lowest: lowestAge,
            Average: sumAge/students.length
        },
    }
}


console.log(CountStudentsData([new Student("Budi", "budi@bola.com", 24, 100), new Student("Budi2", "budi2@bola.com", 24, 100)]))