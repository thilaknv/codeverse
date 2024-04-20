export const questions = [
  {
    id: 1,
    title: "Find the Duplicate Number",
    question: `Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
      There is only one repeated number in nums, return this repeated number.
      You must solve the problem without modifying the array nums and uses only constant extra space.`,
    difficulty: "Medium",
    solved: false,
    examples: [
      { input: "[1,3,4,2,2]", output: "2" },
      { input: "[3,1,3,4,2]", output: "3" },
    ],
    images: ["/src/assets/react.svg"],
    constraints: [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times.",
    ],
    topics: ["Array", "Two Pointers", "Binary Search", "Bit Manipulation"],
  },
];
