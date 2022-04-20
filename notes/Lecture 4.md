# Lecture 4 Nearest Neighbor Problem

Problem definition:

We are given a set $X$ of $n$ points in $\R^d$. And we define the nearest neighbor of any point $q \in \R^d$ as the point $x \in X$, which minimized the distance between that point and the point which we are given. $\text{min} \{ (D(x, q))\}$

In plain words, we neighbor of a point is another point in the space , which is closest to that given point.

### Algorithm 1

First, as usual, we start to approach this problem without any concern about the time or the space complexity.

Therefore, one of the most intuitive solution to this problem is a linear scan.

	nn = -1
	min_dist = \infin
	for i = 1 ... n do
		if d(q, x_i) =< min_dist then
				min_dist = d(q_x_i)
				nn = i
		end if
	end for
	
	return nn, min_dist
	
Notice that in this case, we calculate the distance between the given point $q$ and all other points in the given space and find the one with the smallest distance. And this algorithm can be sealift expanded into a method of finding the "k" nearest neighbor. Further more, used building on this algorithm we can also calculate the weighted nearest neighbor. For example the weight can be $e^{-\text{dist}}$

Now, we can calculate the complexity of this algorithm. First, notice that here we are doing calculation on each of the elements, with each point exist in $R^d$, the cost of calculating distance as mentioned in last lecture is $d$. Therefore, the time complexity of this algorithm is $O(n \cdot d)$

To improve on this, since we would like to be a hundred percent sure of our answer, we need to calculate all the distances, the only thing we can do is to reduce $d$.

And the solution to reduce $d$ in our calculation is to obtain a signature of each data point with less dimension. And it is also important to note that all the signatures need to have the same dimension.

With the signature, we have the following algorithm

	nn = -1
	min_dist = \infin
	for i = 1 ... n do
		if d(sign(q), sign(x_i)) =< min_dist then
				min_dist = d(sign(q),sign(x_i))
				nn = i
		end if
	end for
	
	return nn, min_dist
	
The signing process is the translation from $d$ to $q$, And since we are decreasing dimensions and therefore losing information, it is commonly acceptable for the mapping to be non one-to-one.

Keep in mind that the distance function is the most important consideration when designing the signature.

## Locality-Sensitive Hashing (LSH)

The idea is to construct a hash function $h: \R^d \rightarrow U$ such that for any pair of points $p, q$ we have the following:

* If $D(p, q) \le r$, then $Pr[h(p) = h(q)]$ is high
* If $D(p, q) \ge cr$, then $Pr[h(p) = h(q)]$ is low.

Note: Here, $r$ and $cr$ are simply thresholds that we determine during implementation. 

After the hash function $h$ is defined, we can then use it to approximate the nearest neighbor of any point.

#### Approximate Nearest Neighbor

As mentioned above, LSH is a general framework that for a given $D$ we need to find the right $h$ for the method to work.

And one of its application is in the nearest neighbor problem. Suppose that we are given a set of points $X \subset \R^d$ and are asked to design a function that returns the $r$ nearest neighbor. 

* The search return $p \in X$ of $D(p, q) \le r$
* The search returns nothing if there is no $p \in X$ such that $D(p, q)\le cr$

The search function that is mentioned above belongs to a funny of hash functions called $(P_1, P_2, r, cr)$ -sensitive if for any $p, q$

* If $D(p, q) \le r$, then $Pr[h(p) = h(q)] \ge P_1$
* If $D(p, q) \ge cr$, then $Pr[h(p) = h(q)] \le P_2$

An example in this family is the hamming distance, which is approach using the LSH functions, we can have $h(p) = p$ and probabilities of $Pr[h(p) = h(q)] = 1 - \frac{D(p, q)}{d}$

In which case we can have the following algorithm

	g(p) = h<h1(p), h2(p), ..., hk(p)>
	
When processing, we can follow the steps below:

Step 1: Select the $g_1, g_2, ..., g_L$

Step 2: For all $p \in X$ hash $p$ to the buckets $g_1(p), ..., g_L(p)$

Notice that since the number of the possible buckets might be large, we only need to maintain the non-empty ones.

After, we settled on the algorithm we can calculate the time complexity. For a query $q$, we first need to retrieve the points from the buckets $g_1(q), g_2(q), ..., g_L(q)$. We can say that the points retrieved are $x_1, ..., x_L$. And if $D(x_i, q) \le r$ we report it. Otherwise we report that there does not exist such a nearest neighbor. Therefore, the time complexity of this algorithm is $O(dL)$.

### Key Steps when Implementing this Algorithm

1. Shingling: Shingling is the step where we convert the documents to sets.

2. LSH: LSH convert large sets of data to small signatures while preserving the similarity of the data.
3. Compare the signatures instead of the actual documents.

For example, if we have a $k$ -shingle ($k$ -gram). Which is a sequence of $k$ characters that appears in a document. If the document contains "abcab" and $k = 3$, then $2$ -singles are

$$\{ab, bc, ca\}$$

And there, we have represented the document in a set of $k$ singles.

Now, we can make the assumption that documents that have similar sets of $k$ -shingles are similar. As same text appears in the two documents. Note that the position of the appearance of the text is not important.

### Data Models: Set

One way we can represent the data is as sets. In this way we can define the similarity between data using the intersection between their set representation.

And when we are taking about set intersection, it is natural to think about Jaccard coefficient. 

Assume we have the following binary vectors:

$$x \in \{0, 1\}^d$$

$$y \in \{0, 1\}^d$$

$$\Rightarrow d(x, y) = 1 - JS(x, y) = 1 - \frac{|x \cap y|}{|x \cup y|}$$

Here, all we need to do is to design a signature function with the following properties

$$\tilde{d}(\text{sign}(x), \text{sign}(y)) \approx d(x, y)$$

$$\Downarrow$$

$$\text{sign}(x), \text{sign}(y) \in \R^k \hspace{6mm} k \ll d$$

For example: (Minimum hash representation)

Assume:

$$x  = \{a, b, c, d\}$$

$$y = \{a, b, d\}$$

$$\Rightarrow \text{JS}(x, y) = \frac{2}{5} \rightarrow \text{JD}(x, y) = \frac{3}{5}$$

Now, we can create a random permutation $\pi$:

$$\pi_i = \{f, d, c, b, a\}$$

Here, the signature of $x$ given $\pi_1$ in $\text{sign}_{\pi_1}(x)$. Then, we can find the smallest index in $\pi_1$ such that the element belongs to $x$.

$$\text{sign}_{\pi_1}(x) = 1$$

$$\text{sign}_{\pi_1}(y) = 2$$

$$\pi_2 = \{a, b, c, f, d\} \Rightarrow \begin{cases}\text{sign}_{\pi_2}(x) = 1 \\ \text{sign}_{\pi_2}(y) = 1\end{cases}$$

$$\pi_3 = \{b, a, f, c, d\} \Rightarrow \begin{cases}\text{sign}_{\pi_3}(x) = 1 \\ \text{sign}_{\pi_3}(y) = 1\end{cases}$$

After all that, we can create a table using the signatures collected from $x$ and $y$

|  | $$\pi_1$$ | $$\pi_2$$ | $$\dots$$ | $$\pi_n$$ |
|:--|:--|:--|:--|:--|
| $$\text{sign}(x)$$ | $$\text{sign}_{\pi_1}(x)$$ | $$\dots$$ | $$\dots$$ | $$\dots$$ |
| $$\text{sign}(x)$$ | $$\text{sign}_{\pi_1}(y)$$ | $$\dots$$ | $$\dots$$ | $$\dots$$ |

$$\Downarrow$$

$$\text{sign}(x) \hspace{6mm} 1 \hspace{6mm} 1 \hspace{6mm} 1 \hspace{6mm} ...$$

$$\text{sign}(y) \hspace{6mm} 2 \hspace{6mm} 1 \hspace{6mm} 1 \hspace{6mm} ...$$

Since the Jaccard distance is the fraction between the position in which $x$ and $y$ disagree and the position  which the agree, we can have the following

$$\text{Pr}_{\pi \in \Pi} \left[\text{sign}_{\pi}(x) = \text{sign}_{\pi}(y)\right]$$

Therefore, we we use this distance function, two signature are equal if and only if the distance function results in zero.

Notice that one draw back in this case is we need to store all the permutations in order to the calculate the distances. Therefore, if needed, we can sample the permutation and instead of storing the permutation, we can have a hash function that simulate the permutation.

## Additional Notice

When creating the signatures, we need to enforce a check point that objects with similar signatures are actually similar. However, comparing large number of signatures with each otters mat take too much time. Therefore, this method can product pairs of objects that might not be similar (false positive)

### Minhash Algorithm

Step 1: Pick $k$ permutation of the rows

Step 2: Think of $\text{sign}(x)$ as a new vector

Step 3: Let $\text{sign}(x)[i]$ in the $i$ -th permutation, the index of the first row that has $1$ for object $x$

***

Got to he office hour of Minhash algorithm, specifically the tables on the slides.