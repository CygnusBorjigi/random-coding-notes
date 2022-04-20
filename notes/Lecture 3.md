# lecture 3 Organized | Distance Function

One of the most crucial question in data mining is "How can be measure how similar or different two elements in the data set are?". And one of the most obvious way to answer this question is with a distance function.

In computation, we can be handed with a dataset $X$ as a collection of objects. For the purpose of discussion, we say that the elements can be written as $x, y, z, ...$. For now, we make no assumption about the representation of the objects in $X$. Those objects can be real-valued vectors, binary vectors, sets, times series, or whatever you want them to be.

Given this set $X$ of objects, we need to define a function $d : X \times X \rightarrow \mathbb{R}$ so we can calculate how similar each object in $X$ is to one another. And in most cases, the function would be considered a good function is it has the following properties:

1. The function has to be non-negative: $$d(x, y) \ge 0$$
2. The function has to be in isolation: $$d (x, y) = 0 \Leftrightarrow x = y$$
3. The function has to show symmetry: $$d(x, y) = d(y, x)$$
4. The function has to show triangle inequality: $$\forall x, y, z \in X \left( d(x, y) \le d(x, z) + d(z, y)\right)$$

Those four properties are so important, that the Computer Science community has come to a decision that any distance function that have those four properties would have a special name, **metrics**. And a data space equipped with a metric function is called a **metric space**.

At this point, it is necessary to introduce the two main types of functions for modeling the similarity of objects. 

1. The distance function $d: X \times X \rightarrow \mathbb{R}$. Where the larger the difference between the two object is, the larger the result is.
2. The Similarity function: $s: X \times X \rightarrow \mathbb{R}$. Where is the smaller the difference between the two object is, the larger the result is.

### When data is real-valued vector

#### Distance function

In most cases, where the objects in the domain are real-valued vectors, we use the Minkowski distance ($L_p$ norms). Where the function states:

$$L_p(x, y) = \left(\Sigma_{i = 1}^{d} \vert x_i - y_i \vert^p\right)^{\frac{1}{p}}$$

In this function, the value $p$ can be any number. But for this discussion, we are particularly interested in the following two cases:

The first cases is when $p = 1$. When this happens, the distance calculated $L_1$ can be called the **Manhattan** or **Hamming** distance. For clarity, the function is as follow:

$$L_1(x, y) = \left(\Sigma_{i = 1}^{d} \vert x_i - y_i \vert\right)$$

The second case is when $p = 2$. When this happens, the distance calculated $L_2$ can be called the Euclidean distance:

$$L_2(x, y) = \left(\Sigma_{i = 1}^{d} \vert x_i - y_i \vert^2\right)^{\frac{1}{2}}$$


If we represent the data using matrix we have the following

$$\text{Data Matrix} \begin{bmatrix}x_{11} & ... & x_{1m}\\ ... & ... & ... \\ x_{n1} & ... & x_{nm}\end{bmatrix}$$

$$\text{Distance Matrix} \begin{bmatrix}0 & ... & ... & ... \\ d(2, 1) & ... & ... & ... \\ d(n, 1) &  d(m, 2) & ... & d(n, n-1), 0\end{bmatrix}$$

#### Similarity function

Another common way for calculating distance is using the **Dot product** or the **cosine similarity** where

$$\cos(x, y) = \frac{x \cdot y}{||x|| \hspace{1mm} ||y||}$$

To construct the similarity function from the above statement, we can think of the following situation:

We are given to arrays of binary data and have been asked to calculate the similarity between them.

/Screen Shot 2022-01-28 at 5.23.19 PM.png

Of course, we can use the Hamming distance, which in its case can be calculated using 

$$L_1 (x, y) = \left(\Sigma_{i = 1}^{d} |x_i - y_i|\right)$$

However, when we really think it through, it is not difficult to see one of the major drawbacks of the Hamming distance in this situation. Consider the following:

We are given two groups of data, each group contains two of binary vectors. One of the group contains two vectors with ver large number of entires, identical in almost all of those entires except for a very few. The other group contains two vectors with very few entires but differ on all of them. Then in this case, the Hamming distance function will report the same distance for both of them, even though, for obvious reasons, the first group contains much more similarities than the second group.

For this reason, we introduce one of similar function that is commonly used. The **Jaccard similarity** which measures ratio between the intersection and the union of two objects. It states:

$$\text{JSim}(x, y) = \frac{|x \cap y|}{|x \cup y|}$$

And the **Jaccard distance**:

$$\text{JDist}(x, y) = 1 - \frac{|x \cap y|}{|x \cup y|}$$

Using those function, the calculation of distance for the example above will make much more sense. 

Lets consider another situation:

We are given two arrays of characters with equal length. Then we have been asked to tell how similar those two arrays are.

In this case, we can use a modification of the Hamming distance where we add $1$ to the difference for all the position that have different character. 

Observe that this algorithm has some obvious draw backs. One of them being the two arrays we get need to be of same length. And another one being, if one array is a slightly shifted version of the other one. Although ideally we would agree that those arrays are very similar, the algorithm will report that there is a great distance between those arrays.

In this case, we can try to resolve the draw backs by introducing the concept of "string edit distance". The string edit distance is essentially a representation of the amount of work we have to do in order to make those elements identical.

Consider the following

We are given two strings $x$ and $y$. And then we are asked to change one to the other and only single character edits are allowed. 

Essentially, we are being asked to calculate the editing distance between those two strings. Which, congenitally can use solved by using the technique of Dynamic Programming.

#### Dynamic Programming

Dynamic programming is perhaps one of the most important programming concept. In summary, this technique uses the following three steps to solve a problem.

1. Identify the sub-problem
2. Identity the relation between the sub-problems
3. Build a table

Following the method of dynamic programing, we can solve the edit distance problem of those two given string.

First, we  name the two strings $x$ and $y$, then we build a table with dimension $n \times m$ where $x = n$ and $y = m$. After that we define $D(i, j)$  as the representation of the optimal distance between string $x[1 ... i]$ and $y[1 ... j]$.

Now, we have laid the ground work, we need to determine a way to calculate $D(i, j)$. Observe, that for every two given substring, we have the three ways to match them.

1. We match the last two characters
2. We match them by deleting the last character in one string
3. We match them by deleting the last character in the other string

Therefore, we have the following representation

$$D(i, j) = \begin{cases}\text{min }(D(i - 1, j)) + \text{delete}(x[i])\\ D(i, j - 1) + \text{insert}(y[j]) \\ D(i-1, j-1) + \text{substitute}(x[i], y[j])\end{cases}$$

