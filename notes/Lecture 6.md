# Lecture 6

##### For this lecture, we consider an approximation that is is applicable to data when it is being represented by a matrix

/Screen Shot 2022-02-12 at 1.17.01 PM.png

Here, we have a $m \times n$ matrix and the rank of this matrix is the dimension of its column space. For reference, we call this matrix $A$. Since the dimension of a space is defined by **the smallest number of vectors needed to span the space** we say that the dimension of the column space of the matrix $A$ is the smallest number of vectors that suffice to construct the column of $A$.

### The logic of Rank $k$ approximation

Following this logic, was rank of $A$ is the size of the smallest set of 

$$\{u_1, u_2, ..., u_p\}$$

Such that for every $a_i$ (every row) can be expressed as:

$$a_i = c_{i_1} u_1 + c_{i_2} u_2 + ... + c_{i_p} u_p \text{ where } i = 1, ..., n$$

Notice that the largest value for the rank of a matrix is $\text{min}(m, n)$. However, in some cases, the rank of a matrix is less than that.

Here, we can store a matrix $A \in \R^{m \times n}$ in $m \cdot n$ values. However, if $A$ has a rank $k$, then we can factor $A$ as $UV$, where $U \in \R^{m \times k}$ and $V \in \R^{k \times n}$. And now, we only need $K(m + n)$ values, which from our assumption that $k \ll n$ is much lesser than $m \cdot n$

/Screen Shot 2022-02-12 at 1.31.12 PM.png

Following this logic, when we apply this technique to real data, we often want to approximate the data matrix $A$ with a low-rank matrix $A^{(k)}$ so that we can save on computing power. And to measure the quality of our approximation, we take the norm of those matrix.

Introducing Frobenius Norm, which is the $l_2$ norm and it is defined as

$$||A||_F = \sqrt{\Sigma a^2_{ij}}$$

Therefore, we can define our distance function using the Frobenius Norm

$$\text{dist}(A, B) = ||A - B||_F$$

Finally, we can define the rank $k$ approximation of $A$. When $k < \text{rank}(A)$, then the rank $k$ approximation to $A$ is the closest rank $k$ matrix to $A$. I.e.

$$A^k = \text{arg}_{\{B | \text{rank } B=k\}} \text{ min } ||A - B||_F$$

This can also be considered to be the best rank $k$ approximation to $A$ in a least-square sense.

Now, consider the following:

Given $A^k$ as the rank $k$ approximation of the matrix $A$. By definition, there exist a set $\mathcal{U}$ of $k$ vectors such that each column of $A^k$ can be expressed as a linear combination of the vectors in $\mathcal{U}$. Now, we take all the vector in the set $\mathcal{U}$ and from a matrix $U$. And observe

$$A^k = UV^T \text{ for some coefficient } V^T$$

There, the coefficient $V^T$ describe the linear combination of $U$ that yield the column of $A^k$. Therefore, $U$ is of shape $m \times k$ and $V$ is of same $n \times k$. Following this chain of thought, we can say that the error insure during our approximation is $||A - A^{(k)}||_F$. Therefore, a rank $k$ approximation $A^{k}$ is valuable if both of the following is true.

1. $||A - A^k||_F$ is small compare to $||A||_F$
2. $k$ is small compare to both $m$ and $n$

If both of those conditions are met, we have achieved a simplification of data without a great loss in accuracy.


### Method to find the rank $k$ approximation of a matrix

One of the best way to find the rank $k$ approximation of any matrix is Singular Value Decomposition (SVD). As mentioned in the last lecture, the singular value decomposition of a matrix $A$ is expressed as follow:

$$A = U \cdot \Sigma \cdot V^T$$

Notice that,

1. $U$ is a matrix of shape $m \times r$
2. $V$ is a matrix of shape $n \times r$
3. The columns of $U$ are mutually orthogonal and unit length. I.e. $U^T U = I$
4. The columns of $V$ are mutually orthogonal and unit length. I.e. $V^T V = I$
5. $\Sigma$ is a diagonal matrix of shape $r \times r$, where is diagonal values are 

$$\sigma_1 \ge \sigma_2 \ge \sigma_3 ... \ge \sigma_r \ge 0$$

/Screen Shot 2022-02-12 at 6.19.43 PM.png

Notice, if $A$ is a matrix of shape $m \times n$, SVD does the following two things:

1. It gives the best rank $k$ approximation of $A$ for every $k$ up to the rank of $A$.
2. If given the distance of the best approximation of $A^k$ from $A$.

It is also important to note that the in order to get the best rank $k$ approximation of $A$, we need:

1. $U' =$ the $k$ leftmost column of $U$
2. $\Sigma'$ = The $k \times k$ upper left most sub matrix of $\Sigma$
3. $V'$ The $k$ left most columns of $V$

$$\text{The best approximation } = U' \Sigma' (V')^T$$

Further more, we can calculate the distance of the best rank $k$ approximation $A^k$ from $A$ using the following formula:

$$\sqrt{\Sigma^r_{i = k + 1} \sigma^2_i} \text{ which can also be expressed as } ||A - A^k||^2_F = \Sigma^r_{i = k + 1} \sigma^2_1$$

### Some special case

In most cases, the matrix representation of data we encounter are full rank matrix, which mean that the rank of the matrix is equal $\text{min}(m, n)$. However, it is also the case that those data matrix have low **effective rank**. Which means that one can usually capture most of the data $A$ represents by using $A^k$ for which $k \ll \text{min}(m, n)$. Therefore, for a given data matrix, we can judge when it is the case by looking at its singular values. 

### Manipulate Data Matrix Using python

The most common library used to manipulate data matrix in python is Numpy. If we want the singular valued decomposition of a matrix we simply do the following:

	u, s, vt = np.linalg.svd(<matrix>)
	
To observe the singular values is $\Sigma$ we can using the following to plot the matrix

	plt.plot(range(1 + len(s)), s)
	
For example:

/Screen Shot 2022-02-12 at 6.50.31 PM.png	

