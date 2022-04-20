# Lecture 2 Organized

##### Sampling algorithms that have constant space complexity

### Problem 1: Given a sequence of item $P$ of size $n$. Form a random sample $S$ of $P$ with the size of $k$ there $k < n$. The samples choses without replacement.

#### Algorithm 1

First, without any concern of space or time complexity, we can form the following solution:
```
	for a = 1 ... n do
		b = random([1 - a-1])
		swap P[a] with P[b]
	end for
```	
Here, the algorithm the first generates all possible permutations of the set of elements $P$, then randomly selects one of those permutation, finally it selects the first $k$ elements in that permutation.

Notice that for this algorithm, the time is linear since the work we need to do is directly correlate with the $n$. However, we this algorithm requires us to know $P$ in advance. i.e we need to store all the element ignorer to perform the permutation. 

What is worse is that since we need to store all possible permutation of a set of $n$ items, we need $n!$ memory space for this algorithm to run.

$$\text{Time Complexity } O(n)$$

$$\text{Space Complexity } O(n!)$$

#### Algorithm 2

For a more space efficient algorithm, notice that at the bare minimum we need to store $k$ element for the return value. Therefore, we can try to develop an algorithm that only requires $k$ memory space.

First, in the case of $n \le k$, every element in $n$ will be selected in a random process. Therefore, the for the initial $k$ element in $S$, we need to store all of them.

Then, we consider all the element in $S$ that comes after the $k$ th element. Essentially, for each of those elements, we only need to decide whether or not we would like to keep it in the memory. If we choose not to keeps it, then it is permanently lost. But if we decide to store it, and since the memory is full, we need to decide among those elements currently in the memory, which of them we need to remove.

Following that thought, we can have the following algorithm:

For the first $k$ element, we store all of them. And after that, we say that for each element $P$ at index $t$, we first generate a random number from the range $1$ to $t$, if that number is greater than $k$, we choose not to store that $P$. But if that random number if less than or equal to $k$, we choose to keep it. In which case, we need to to decide which current element in the memory is needs replace. Since the random number generated is already less than $k$, we can use that random number to represent the index in the memory for which the new element will replace.Thus we can write the following code:
```
	S := The memory
	P := the input stream of elements
	
	for a = 1 to k
		S[i] = P[i]
	end for
	
	t = k + 1
	
	while P is not empty
		rand = Random([1 ... t])
		if (rand <= k)
			S[rand] = P[t]
		t = t + 1
	end while
```	
Now, we prove the correctness of the algorithm using induction. We first need to agree on the following two statement:

First at iteration $t + 1$ the probability of element $p[t+1]$ is $\frac{k}{t + 1}$

Proof:

This is clear in the description of the algorithm that the there are $t + 1$ number we can randomly choose from and among them $k$ number represent the decision of storing that element in the memory.

$\hspace{120mm} \blacksquare$


Second, at iteration $t + 1$ the probability of each element in the memory to be kept in the memory is also $\frac{k}{t + 1}$.

Proof:

We can show this by the law of total probability which states if $\{B_n : n = 1, 2, 3, ...\}$ is a finite or countably infinite partition of a sample space and each event $B_n$ is measurable, then for any event $A$ of the same probability space $P(A) = \Sigma_{n} P(A \cap B_n)$ or $P(A) = \Sigma_{n} P (A | B_n) P(B_n)$. In this case, we use $K$ to represent the event that an element that is currently in the memory, remains in the memory at any given iteration. We use $v$ to represent the value of the random number, and we use $E$ to represent the event that the an element that is currently in the memory being evicted.

Therefore, the probability of an element that is currently in the memory to remain in the memory at iteration $t + 1$ is the probability that the element remain in the memory at iteration $t$ which is $\left(\frac{k}{t}\right)$  multiply by the probability of the random number ended up being greater than $k$  which is $\left(1 - \frac{k}{t}\right)$ in which case, not selection will happen , therefore the probability of remain for each element in the memory is $(1)$ plus the probability of the random number ended up being less than $k$ which is $\frac{k}{t + 1}$ times the probability of eviction in that case, which is $\left(1 - \frac{1}{k}\right)$

Therefore, we can state that the probability of remain for the element currently in the memory is $\frac{k}{t} \cdot \left(\left(1 - \frac{k}{t}\right) \cdot 1 + \frac{k}{t + 1} \cdot \left(1 - \frac{1}{k}\right)\right)= \frac{k}{t + 1}$

$\hspace{120mm} \blacksquare$

After we agree on those two statements, we can move to the inductive argument. Which can be stated as: At iteration $t$ the items in the memory is sampled with the probability of $\frac{k}{t}$ and the probability of remain that in iteration $t + 1$ is $\frac{k}{t + 1}$.

Therefore, by induction, the algorithm in correct.

$\hspace{120mm} \blacksquare$

This algorithm has the following main advantages. It has a linear time complexity, it only requires a single pass through the data, where we do not need to store and evaluated data, and we do not need to know the entire sequence in advance.

### Problem 2: Given a set $d$ containing items $\{a_1, ..., a_d\}$ and a stream of elements $S_1, ..., S_n$. We use $f(i)$ to represent the number of appearance of $a_i$ in the stream and the $f'(i)$ to represent the estimated number of appearance of $a_i$ in the stream.

#### Algorithm 1

First, without any concern of space or time complexity, we can come up with a solution where we can construct a hash table and store the number of appearance of each element in the stream and calculate their frequency after we have evaluate every element in the stream.

In this case, it is obvious that this algorithm has a space complexity of $O(d)$ since we have to allocate a memory space for each is the distinct element.

#### Algorithm 2

Then, we can try to improve our solution by think if we can come up with a solution that has a space complexity by only approximate the frequency of each element. In addition to that, we can state our goal of accuracy as

$$\vert f(i) - f'(i) \vert \le \frac{n}{l}$$

In order to achieve that, we can do the following:

We fix the number of item, which frequency we would like to keep. In this case, we say that we only allocate enough memory space enough to store the frequency of $l$ elements.

Then, we start on going thought each time in the stream.

For each item we encounter, if the frequency of that item is already stored in the memory, we increment that frequency; if the frequency of that item is not stored in the memory and there is free memory space, then we add the item and frequency $1$ to the memeory. If the frequency of that item is not in the memory and there is no free space in the memory, we do the following:

We use $\delta_t$ to represent the median counter value at iteration $t$. So $\delta = f_{\frac{l}{2}}$ and we decrease all counters by $\delta$. In this way,  those items with frequency less than the median value will have their counter reduced to less than or equal to $0$, there by deleting them from the memory, which makes room for the new element.

We repeat this process until all the data in the stream is evaluated. And return the items and their frequency remains in the memory at the end.

Observe that, we increate the count only by $1$ for each occurrence of each item $(f'(i) \le f(i))$ and because we decrease each counter by at most $\delta_t$ at  iteration $t$ we have $f'(i) \ge f(i) - \Sigma_{t} \delta_t$. Therefore, we can calculate the total approximated frequency as $0 \le \Sigma_{I} f'(i) \le n - \frac{l}{2} \cdot \Sigma_{t} \delta_t \cdot \Sigma_{t} \delta_t \le \frac{2n}{l}$. In this case, if we set $l$ equal to $\frac{2}{\epsilon}$ then we get $|f(i) - f'(i)| \le \epsilon \cdot n$, which is the goal we set out to achieve.