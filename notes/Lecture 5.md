# Lecture 5 Dimensionality Reduction

At this point, it is important to notice that the efficiency of the algorithm depends in the number of dimensions the data set have. $d$

* Distance and similarity computations are that least linear to the number of dimensions.
* Index structure fails as the dimensionality of the data set increases.

Therefore, one of the most important task in data mining is to reduce the dimensionality of the data while maintain the meaningfulness of the data.

### Properties of linear transformation for dimensionality reduction

Consider a data set represented by a matrix $A$. Assume that $A$ is $d \times n$ , which means there are $n$ data points in the set and each point is of dimension $d$. 

And we need to reduce the dimension of each data point from $d$ to $k$, 

$$\text{I.e. } x_i \in \R^d \rightarrow y_i \in \R^k \text{ where } k \ll d$$

During the dimensionality reduction, it is important to keep the following method in mind:

* Feature selection: Choose a subset of the feature of the  original data set
* Feature extraction: Create new feature by combining existing features

For now, we need to find a linear transformation $F(x_i) \rightarrow y_i$ with the following properties $y_i = x_i \cdot A$, where $y_i$ is of dimension $1 \times k$, $x_i$ is of dimension $1 \times d$ and $A$ is the transformation matrix with the dimension $d \times k$

$$\underbrace{X}_{\text{original data matrix}} \cdot \underbrace{A}_{\text{Transformation Matrix}} = \underbrace{Y}_{\text{resulting matrix}}$$

Note that ideally, $Y$ should be as close to $X$ as possible.

### Theories of linear transformation

Remember that linear transformation is the change of axis. And in the case of dimensionality reduction, we can apply the Johnson–Lindenstrauss lemma. The lemma states:

Given $\epsilon > 0$ and an integer $n$. Let $k$ be a positive integer such that 
$$k \ge k_0 = O(\epsilon^{-2} \log(n))$$ 

In this case, for every set $X$ of $n$ points in $R^d$, there exists $f: R^d \rightarrow R^k$ such that $\forall x_i, x_j \in X$ there exists:

$$(1 - \epsilon) || x_i - x_j ||^2 \le ||f(x_i) - f(x_j) ||^2 \le (1 + \epsilon) || x_i - x_j ||^2$$

From the lemma above, we can generate the following intuition:

* Vectores $x_i \in \R^d$ are projected into a $k$ dimensional space where $k \ll d$ and $y_i = x_i \cdot A$
* $\forall i (||x_i|| = 1) \rightarrow ||x_i - x_j||^2$ is approximated by $\frac{d}{k} ||y_i - y_j||^2$
* The expected squared norm of a projection of a unit vector onto a random subspace through the origin is $\frac{k}{d}$
* The probability that it deviates from exception is very small.

### Finding the random projection

Now we have a idea about what kind of transformation matrix $A$ we are looking for

* Project $x_i \in \R^d$ onto a $k$ dimensional space where $k \ll d$
* $y_i = x_i \cdot A$

We can find $A$ using singular value decomposition. And can express the matrix $A$ with its Frobenius norm

$$||A||_F = \Sigma_{i, j}(A_{i, j})^2$$

The goal of the single value decomposition is to minimize the $||X - X_k||$ where $X_k$ is the rank $k$ representation of the original data.

Note: Since we are taking the norm of the difference between $X$ and its rank $k$ approximation. In minimizing it, we are expressing the intension that we would like to lose as few detail as possible.

Side Note: The rank of a matrix is the minimum number of vectors, which linear combination can make up the entire matrix. I.e. number of linearly independent vectors in that matrix.

$$\text{Matrix} = \begin{bmatrix}\text{coefficient} \\ \text{Matrix}\end{bmatrix} \times \begin{bmatrix}\text{Row} \\ \text{Vector}\end{bmatrix}$$

Here, the coefficient matrix is the $k$ dimensional representation of the original data. The row vector is the representation of the new axis in the change of axis, which is essentially a translation mechanism in case we need the original version of the representation. And the whole things implies that every matrix of rank $k$ can be represented in dimension of $k$.

Conventionally, the whole thing can be represented as 

$$A = U \Sigma V^T$$

For example:

Suppose we have a matrix $X \in \R^{n \times d}$. Try to decompose it into three matrix $U$, $\Sigma$, and $V^T$ such that

$$X = \underbrace{U}_{n \times l} \underbrace{\Sigma}_{l \times l} \underbrace{V^T}_{l \times d}$$

We can think of $U$ as $n$ quantity of column vector each have $l$ entires. $\Sigma$ is a diagonal matrix with decreasing $\sigma$ along its diagonal. And $V^T$ as $d$ quantity of row vector each with $l$ entires.

The rank of the original matrix = The number of non-zero value in $\Sigma$

Therefore, when we are looking for a proper $k$, we calculate $\frac{||x_k||_F}{||X||_F} \ge 80 \%$

/Screen Shot 2022-02-06 at 2.00.22 PM.png