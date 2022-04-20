# Lecture 8

**Lemma:** If that distance function is metric, then

$$\Sigma^n_{i = 1} d(x_i, \bar{x}) \le 2 \cdot \Sigma^n_{i = 1} d (x_i, x^*)$$

Proof:

Assume that we are given a set of points $X = \{x_1, ..., x_n\}$ where $\bar{x} \in X$ and $x^*$ is in the same domain. Let $y$ be a iterator.

Let $x' \in X$ such that $x' = \text{ arg min }_{y \in X} d(x^*, y)$. 

Therefore, $\forall x_i \in X \hspace{2mm} d(x_i, x^*) \ge d(x', x^*)$. Since $x'$ is defined to always be the closest point to $x^*$

Since $\bar{x}$ is the sample representative, $\Sigma^n_{i=1} d(x_i, \bar{x}) \le \Sigma^n_{i=1} d(x_i, x')$

Here, we can apply the triangle inequality

$$\Sigma^n_{i=1} d(x_i, \bar{x}) \le \Sigma^n_{i=1} [d(x_i, x^*) + d(x^*, x')]$$

distribute the submission $\Sigma^n_{i=1} d(x_i, \bar{x}) \le \Sigma^n_{i=1} d(x_i, x^*) + \Sigma^n_{i=1}d(x^*, x')$

Again since $x'$ is defined to always be the closest point to $x*$ we say that $\Sigma^n_{i = 1} d(x_i, x^*)$ is greater than $\Sigma^n_{i=1} d (x', x^*)$. 

$$\Sigma^n_{i=1} d(x_i, \bar{x}) \le \Sigma^n_{i=1} d(x_i, x^*) + \Sigma^n_{i=1} d(x_i, x^*)$$

Simplify the terms and we get $\Sigma^n_{i = 1} d(x_i, \bar{x}) \le 2 \Sigma^n_{i = 1} d(x_i, x^*)$

$\hspace{100mm} \blacksquare$

## Partition Clustering

Remember that we define representative as given $X = \{x_1, x_2, ..., x_n\}$ where $x_i \in \mathcal{U}$ an the distance function $d$, we find $x^*$ such that it minimize

$$\Sigma^n_{i=1} d(x^*, x_i)$$

Now, we can define the concept of partition clustering

Given $X = \{x_1, x_2, ..., x_n\}$ where $x_i \in \mathcal{U}$ and a distance function $d$. Find a partition of $X$ into $k$ groups $G_1, G_2, ..., G_3$ such that is minimize the following

$$\Sigma^k_{\mathfrak{l} = 1} \Sigma_{x_i \in G_{\mathfrak{l}}} d(x_i, r_{\mathfrak{l}})$$

Where $r_{\mathfrak{l}}$ is the representative of group $G_{\mathfrak{l}}$.

Note:

* Each object belongs to exactly one cluster
* The number of clusters $k$ is given in advance

### The $k$ means problem

Consider a set of points $X = \{x_1, x_2, ..., x_n\}$ of $n$ points in $\R^d$ and a natural number $k$. We need to find $k$ points $c_1, ..., c_k$ so that it minimizes the following:

$$\Sigma^{n}_{i = 1} \text{min}_{j} \{L^2_2 (x_i, c_j)\} = \Sigma^{n}_{i = 1} \text{min}_{j} ||x_i - c_j||^2_2$$

Which means we need to partition $X$ in to $\{X_1, ..., X_k\}$ by assigning each  point $x_i$ in $X$ to its nearest cluster center in order to minimize

$$\Sigma^{n}_{i = 1} \text{ min }_{j} ||x_i - c_j||^2_2 = \Sigma^{k}_{j = 1} \Sigma_{x \in X_j} ||x - c_j||^2_2$$

The problem is $NP$ hard if the dimension of the data is more than $1$. However,  for $d = 1$, the problem can be solved in polynomial time. In practice, a simple iterative algorithm may be sufficient.

### $k$ means algorithm

The $k$ means algorithm is a particular case in partition clustering where the distance function $d$ is the sum of squares of the Euclidean distance

$$x_i \in \R^d, x_j \in \R^d$$

$$d(x_i, x_j) = \Sigma^d_{w = 1} \left(x_i^{(\mathcal{w})} - x_j^{(\mathcal{w})}\right)^2$$

Therefore, if $d$ is $L_i$ then in this case

$$d(x_i, x_j) = \Sigma^d_{w = 1} |x_i^{(w)} - x_j^{(w)}|$$


#### Steps of the algorithm

1. Randomly pick $k$ cluster centers $\{c_1, ..., c_k\}$
2. For each $j$, set the cluster $X_j$ to be the set of points in $X$ that are the closest to center $c_j$
3. For each $j$ let $c_j$ be the center of cluster $X_j$ (mean of the vectors in $X_j$) Essentially moving the center little by little.
4. Repeat from step $2$ until convergence.

#### Properties of the $k$ -means algorithm

* Finds a local minimum
* Often converges quickly
* The result of the algorithm is largely influenced by the initial choice of centers
* Tends to find spherical clusters
* Outliners points in the input set can cause a problem
* Difference densities of points in the input set can cause a problem

#### Ways of improving the algorithm

Notice that the defining factor in the $k$ means algorithm is the initialization of the centers. Therefore, one of the ways we can improve the algorithm is to simply repeat it many times and pick the best outcome. Another way of improving the algorithm is to be smart when picking the initial centers. For example, we can try to pick initial center to be as far from each other as possible.

### $k$ means++ algorithm

The $k$ means ++ algorithm is an interpolation between the random initialization and the furthest-first initialization of the centers. It goes as follows

Let $D(x)$ be the distance between $x$ and the nearest center selected so far. Then choose the next center with the probability proportional to 

$$(D(x))^a = D^a(x)$$

Where:

* $a = 0$ : random initialization
* $a = \infin$ : Furthest-first traversal
* $a = 2$ : $k$ means++

#### Initialization phase:

* Choose the first center uniformly at random
* Choose the next center with probability proportional to $D^2(x)$ 

#### Iteration phase:

* Iterate as in $k$ means algorithm until convergence

#### Clarification on the choosing by probability

So say we have chosen our center on the first iteration, then we can calculate the distance from that center to each one of the other points. Then, we can visualize the process of taking the square of all those number in to line segments and stack them up. Then, we randomly choose an point on there, and choose whichever point to the the center that has the random point landed on this segment.