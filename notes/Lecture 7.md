# Lecture 7 Note

## Last of SVD

Remember that $A = \mathcal{U} \Sigma V^T$ where $a \in \R^{n \times m}$ and $r = \text{ min }(m, n)$.

/Screen Shot 2022-02-16 at 12.39.47 PM.png

The goal is to find the best rank $k$ approximation of the matrix denoted:

$$A_k = \mathcal{U}_k \Sigma_k V^T_K$$

Where $k$ minimize the error $$||A - A_k||_F$$

For example:

When $k = 2$, we only take the first row. Therefore every point is now represented in two dimensional space. Notice that this is kind of like trying to find the best angle to observe the blob that is the data cloud.

Another example:

If $k = 5$ and sine we cannot visualize $5$ dimensions, we can try to separate the $5$ dimensions into $2$ dimensions such that

$$D_{1, 2}, D_{1, 3}, ..., D_{i, j}$$ 

$$\begin{bmatrix}u_1, u_2\end{bmatrix} \hspace{2mm} \begin{bmatrix}u_1, u_3\end{bmatrix} \hspace{2mm} ... \hspace{2mm} \begin{bmatrix}u_i, u_j\end{bmatrix} \hspace{2mm}$$

$$\begin{bmatrix}\sigma_1 & \\ & \sigma_2\end{bmatrix} \hspace{2mm}  \begin{bmatrix}\sigma_1 & \\ & \sigma_3\end{bmatrix} \hspace{2mm} ...  \hspace{2mm} \begin{bmatrix}\sigma_i & \\ & \sigma_j\end{bmatrix}$$

Notice that although in most cases, the first singular vector captures the general picture they also only capture the general trends but not the specifics. Therefore, when searching for specifics, it is often worth looking at the third or even the fourth singular vector. Of course, keep in mind that this is only for visualization purposes.

Definition: F-norm

$$||A||_F = \Sigma_{i,j} A (I, j)^2$$

Therefore, if we want to minimize $$||A - A_i||^2_F$$ then that $A_i$ need to capture the most variant in $A$. Then $A_2$ must be worth-normal to $A$ to capture the next largest variant.

## Clustering

In general, the idea of clustering is that we are given a data set $x$ and we group points that are similar to each other together as report them as clusters.

For this discussion, we think of them as points being represented in matrix.

Example:

Input: A set of points

Output: The representative of that set of points.

For example, is some cases, the representative could be the mean or the median. But we need a distance function to argue which one of them is better.

Over all, a **representative** of $X$ is the matrix $d$ given $X = \{x_1, x_2, ..., x_n\}$ is the point $y$ in the same domain of $x (D)$ such that 

$$x^* = \text{arg min}_{w\in D} \Sigma^{m}_{i = 1} d(x_i, w)$$

Note that $y$ is not necessary a member of $X$ but is comes from the same domain as the elements in $X$. I.e. $y$ is a point which the sum of the distance from that point to all other points in $X$ is minimized.

Also notice that $y$ need not to be unique, but it should be uniques if we have choose a good distance function.

On the other hand a **sample representative** given $x = \{x_1, x_2, ..., x_n\}$  is the data point $\hat{y} \in x$ such that

$$\bar{x} \text{ arg min }_{w \in X} \Sigma^{n}_{i = 1} d(x_i, w)$$

Note, in this case $y$ is an element of $X$ and $w$ where only serves as a iterator.

However, no matter the distance function we choose. If that distance function is metric, then

$$\Sigma^n_{i = 1} d(x_i, \bar{x}) \le 2 \cdot \Sigma^n_{i = 1} d (x_i, x^*)$$

(We will prove this in lecture 8)

***

#### Lemma: For any Euclidean space, the representative of a set of data points is the mean of those data points.

Proof:

Suppose $x_i \in \R^d$ and $d(x_i, x_j) = ||x_i - x_j||^2_2 = \Sigma^d_{k = 1}(x_i(k) - x_j(k))^2$

By definition, to find the representative, we need to find the $y$ such that is minimize $\Sigma^n_{i = 1} d(\overrightarrow{y}, x_i)$

Expanding using the distance function we have

$$\Sigma^{n}_{i = 1}d(\overrightarrow{y}, x_i) = \Sigma^n_{i = 1} \Sigma^{d}_{k=1} (y_k - x_{i}(k))^2$$

Flipping the submission sign $\Sigma^{d}_{k=1} \Sigma^n_{i = 1}(y_k - x_{i}(k))^2$ which is

$$(y(1) - x_1(1))^2 + (y(1) - x_2(1))^2 + ... + (y_d - x_1(d))^2 + (y(d) - x_2(d))^2 + ... + (y(d) - x_n(d))^2$$

Since out objective here is to find the minimum value, we can calculate the derivative and look for the zero values.

Therefore, we take the derivative

$$\frac{\partial F(\overrightarrow{y})}{\partial y(d)} = 2 (y(d) - x_1(d)) + ... + 2 (y(d) - x_n(d))$$

And we set the derivative to zero to solve for the value

$$2 (y(d) - x_1(d)) + ... + 2 (y(d) - x_n(d)) = 0$$

$$\Rightarrow 2 \cdot n \cdot y(d) - 2 \Sigma^n_{i = 1} x_i(d) = 0$$

$$\Rightarrow y_d = \frac{\Sigma^n_{i = 1} x_i(d)}{n}$$

Note that is the definition of the mean. Therefore, the proportion is proven.

$\hspace{120mm} \blacksquare$