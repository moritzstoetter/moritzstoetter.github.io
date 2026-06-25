---
title: "The Case for Abstractions and Expressiveness: Less is More"
author: "Moritz Stötter"
date: 2023-12-09
image: "../assets/tree.png" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: "order from chaos"
tags: ["development", "cpp"]
---


In the world of software development, a paradoxical truth often goes unacknowledged: **every line of code we write is not just an asset, but also a liability**. This realization, lies at the heart of why abstractions and expressiveness in code are not just beneficial, but essential for creating robust, maintainable software systems, especially as complexity increases.

### The Double-Edged Sword of Code 

The code we write serves a purpose, solving a problem or implementing a feature. However, each line also introduces a potential source of errors, misunderstandings, and future maintenance headaches. As codebases grow, so does the cognitive load required to understand, debug, and modify them. This is where the power of abstraction and expressive code comes into play. 

### Ditch manual loops

One programming paradigm in this direction that has been popularized by the formidable Sean Parent is "No Raw Loops". This transforms code from imperative "how to do it" instructions into declarative expressions of "what to do." 

Consider, for example, the following piece of code: 

```cpp
std::vector<int> prices = {10, 20, 30, 40, 50};
std::vector<double> discounted_prices;

for (size_t i = 0; i < prices.size(); i++) {
    if (prices[i] > 20) {
        discounted_prices.push_back(prices[i] * 0.9);
    }
}

double total = 0;
for (size_t i = 0; i < discounted_prices.size(); i++) {
    total += discounted_prices[i];
}
```

No doubt, you are capable of figuring out what this does, but that's exactly what you'd have to do. Figure it out. 

Now in contrast consider the following code snippet, that does the same thing but without relying on raw loops:

```cpp
std::vector<int> prices = {10, 20, 30, 40, 50};

auto total = prices 
           | std::views::filter([](int price) { return price > 20; })
           | std::views::transform([](int price) { return price * 0.9; })
           | std::ranges::fold_left(0.0, std::plus<>{});
```

Regardless of wether you are familiar with C++20's ranges library, I am confident that you can read these four lines and directly understand what is happening. This is just way more expressive than the previous snippet, and thus easier to reason about and spot potential bugs. In fact this approach directly eliminates or reduces the chance of some bugs, e.g. off-by-one errors and boundary mistakes. And there is more: Each operation is isolated and composable, making the code easier to test and modify. 

### Abstraction: Hiding Complexity, Revealing Intent 

The gist of of the difference between these code snippets though is that the operations have been extracted from the concrete application and condensed into *filter*, *transform* and *fold_left* in an abstract and generic form. Now these can be applied to all kinds of use cases. In this fashion complex operations are encapsulated behind simple interfaces and in doing so, we reduce the amount of code that needs to be read, understood, and maintained at any given time. A well-designed abstraction hides implementation details while clearly communicating intent. And with careful implementation this comes at no runtime cost (*zero-cost-abstraction*).

### The Compounding Benefits 

As we embrace abstractions and strive for more expressive code, we reap compounding benefits: 

**Reduced Cognitive Load**: Developers can focus on high-level logic rather than low-level implementation details. 

**Improved Maintainability**: With less code and clearer intent, future modifications become easier and less error-prone. 

**Enhanced Collaboration**: Code that clearly expresses its intent facilitates better teamwork and knowledge sharing. 

**Faster Development**: Higher-level abstractions allow for implementation and iteration through reuse. 

**Fewer Bugs**: By reducing the amount of manual, repetitive code, we minimize the surface area for potential errors.

Embracing abstractions and striving for expressiveness is not about dogmatically reducing line count. Instead, it's about thoughtfully designing our code to maximize clarity and minimize complexity. This approach requires a shift in mindset: 

1. Favor declarative over imperative code where possible. 
2. Invest time in designing good abstractions that hide complexity. 
3. Utilize language features and libraries that promote expressiveness. 
4. Continuously refactor to improve clarity and reduce redundancy. 

Remember that the goal is never just code, that works, but code that clearly communicates its intent and minimizes potential sources of error.  By viewing every line of code as both an asset and a liability, we become more discerning in our development practices. We learn to value clarity and conciseness, not for their own sake, but for the tangible benefits they bring to our software projects. In the end, the best code is often not the code we write, but the code we don't have to write because our abstractions and expressive constructs have already handled it for us. 
