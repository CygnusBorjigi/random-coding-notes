# Lecture 2 supplementary | Dynamic Programming

The topic of dynamic programming essentially contains two main topics: Memorization and tabulation.

To worm up, we first consider the following problem:

### The Fibonacci sequence

##### Write a function "fib(n)" that takes in an integer as an argument and return the $n$ th number of the Fibonacci sequence.

The most intuitive way of solving this problems with a recursive function.

	const fib(n) => (n) {
		if (n <= 2) {
			return 1
		} else {
				return fib(n-1) + fib(n-2)
		}
	}

There, we can visualize the process by drawing a tree. For example, if our inout is $7$.

/Screen Shot 2022-01-30 at 10.22.40 AM.png

Notice that in this implementation, we are making two recursive calls when encountering every none base case node. And since in the first half of the return statement we indicate the next node is $n - 1$ and the later half we indicate the next node is $n - 2$, it is safe to say that the height of our tree is $n$. Therefore, this algorithm has a time complexity of $O(2^n)$. Also, notice on the graph that at any given time, we only keep at most $n$ in the call stack (since after the return of a base case, the case that is returned gets dropped) the space complexity of this algorithm is $O(n)$. Here, it is obvious that the bottle neck of our solution is the time complexity.

Side note, just to give a sense of how bad this is. If we ask our solution what is the $50$ the Fibonacci number, which is quite a reasonable and modest index. The number of step our solution will take to solve this problem is 

$$2^{50} = 1, 125, 899, 906, 842, 624$$

To improve on our solution, we need to give a closer look on the three we build for $7$.

Notice that there is a sub tree $3 \begin{cases}2 \\ 1\end{cases}$ that appear repeatedly at the bottom of the tree. And fib of $4$ and fib of $5$ also appears repeatedly. Therefore, if we can think of the solution that eliminate all the duplicate, the time complexity will become much better.

One solution to solve this repetitiveness is to store the values that has already been calculated. And here we arrive at the first main subject of dynamic programming, memoization.

In this case, if we want to store the calculated value, we can use a hash map equivalent. We can have an object 

	const fib(n) => (n, memo = {}) {
		if (n in memo) {
			return memo[n];
		} else {
			if (n <= 2) {
				return 1
			} else {
					memo[n] = fib(n-1, memo) + fib(n-2, memo);
					return  memo[n]; 
			}
		}		
	}

Notice, here we are storing the result of any new calculation into the memo. By check the memo before we calculate any additional value. Therefore, we can eliminate the need to do repeated calculation.

Observe the recursive process of this solution when trying to answer the 6th fib  number

/Screen Shot 2022-01-30 at 11.19.25 AM.png

Notice that if we scale this problem , the memoized tree is only going to grow in a linear fashion. Which mean, in this case, we have a time complexity of $O(n)$

Now, we have worked up with the fib problem we can move on to a more interesting problem.

### Grid traveler problem

Imagine that you are a traveler on a two dimensional grid. You begin at the top-left corner and your goal is to travel to the Botton-right corner. And the rule is you may only move down or to the right. In this case, if we say that the grid has a dimension of $m \times n$, how many different way are there for you to travel?

To solve this problem, we can start from the very beginning. Consider that we have a $1 \times 1$ grid. In this case, since our start is out end, we only have one way to solve the problem. I.e. we do nothing. And if one of the dimension is $0$, then there is no gird for us to travel, therefore, we would have $0$ ways to travel. Notice, we may use this as our base cases.

Then, we try to reframe the problem so that we can decrease the problem size. 

Imagine that we are given a grid of $3 \times 3$. If we decide that our first move in downward and we know that we can only move down or left. Then after the first move, our useable space becomes $2 \times 3$. Therefore, we can say that our problem size has been reduced to a $2 \times 3$ grid. And now say that we decide to move to the right. Then, after the move, we have reduced our problem to a $2 \times 2$ grid and then a $1 \times 2$ and finally a $1 \times 1$.

Now, we have identified our sub-problems. Let's build a tree. 

/Screen Shot 2022-01-30 at 11.50.07 AM.png

In this case, we can write the following

	const gridTravel = (m, n) => {
		if (m === 1 && n === 1) return 1;
		if (m === 0 || n === 0) return 0;
		return gridTravel(m-1, n) + gridTravel(m, n-1);
	}
	
To analyze the complexity of this algorithm, let's think about the height of the tree. Observe that here we have two base cases, either when both $m$ and $n$ are $1$, or when one of them is $0$. Since the case where both of them are $1$ is the more farfetched case, we can use that to calculate the height of the tree. Since, in each step we are only allowed to subtract $1$ from other $m$ or $n$, the height of the tree can be represented as $m + n$.

Since for each non base case node we have two options, the time complexity of out algorithm is $O(2^{m + n})$. And since at any given time, the capacity of the call stack is less than or equal to the height of the tree, we have a space complexity of $O(m + n)$

Now, we can start of improve the solution.

Notice that as represented in the graph. When calculating for the case $(2, 3)$ we have calculated the case $(1, 2)$ two times. Therefore, it is safe to say that our solution can be improved by implementing memorization. And on the far right size of the tree, the number of ways to travel a $(1, 2)$ grid is really the same as the number if ways to travel a $(2, 1)$ tree.

Therefore, we can write the following:

	const gridTravel = (m, n, memo = {}) => {
		const key = m + "," + n;
		
		if (key in memo) return memo[key];
		if (m === 1 && n === 1) return 1;
		if (m === 0 || n === 0) return 0;
		
		memo [key] = gridTravel(m-1, n, memo) + gridTravel(m, n-1, memo);
		return memo [key];
	}

Now, we can start to analyze the complexity of the algorithm.

As an example, consider the case where we are given the grid of $4 \times 3$. Since we can only move down or to the left, all the nodes in the tree would have $m \in \{0, 1, 2, 3, 4\}$ and $n \in \{0, 1, 2, 3\}$. Therefore, the number of distinct node in the tree would be $m \cdot n$. Therefore, in this case, we have the space complexity of $O(m + n)$ and a time complexity of $O(m \cdot n)$

##### Memorization Technique

After those two problems, we can now try to summarize the general technique of implementing memorization into a solution. We can view the process of the implementation in two general steps, make it work and make it efficient.

In the first step, it is effective to visualize the problem using a tree and then implement the tree using recursion. After that, test the recursion to make sure it is right. 

Then in the second step, we add an memo object to store the result of each step along the way and only do a calculation when the question is not in the memo. 