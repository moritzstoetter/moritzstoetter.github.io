---
title: "Why modern microcontrollers need modern methods"
author: "Moritz Stötter"
date: 2023-10-06
image: "../assets/yarn.webp" # https://docs.astro.build/en/guides/images/#images-in-content-collections
imageAlt: "order from chaos"
tags: ["development", "consulting", "cpp"]
---

### Embedded devices are no longer what they used to be 

Many of today's microcontrollers can match or even exceed the computing capacities of desktop CPUs from the 1990s and early 2000s. A typical modern ARM Cortex-M4 microcontroller, for example, can operate at a clock frequency of 200 MHz, comparable to high-end desktop processors from the late 1990s. Memory capacity has also grown considerably: some microcontrollers offer several megabytes of RAM and flash memory, putting them in the same league as PCs from that era. This means that modern microcontrollers can handle tasks that would previously have required a complete desktop computer. 

### Embedded software has become more complex

Of course, this increase in performance has also been accompanied by increasingly complex applications. In the last ten years in particular, embedded software has undergone a dramatic development in terms of complexity. Today, firmware often includes real-time operating systems, complex communication stacks, advanced signal processing algorithms, machine learning models, graphical user interfaces, remote maintenance, energy efficiency and compliance with security and privacy standards.

Through this increasing complexity it has become necessary to adopt more advanced development tools, debugging techniques and software architectures, forcing embedded developers to expand their skills and adopt practices traditionally associated with larger software development. 

### The field is lagging behind

However, many embedded projects still rely on outdated development methods and tools that are not suited to modern challenges. Typical implementations often remain opaque and are characterized by monolithic codebases, strong dependencies on vendor-specific IDEs, SDKs and tools, minimal abstraction and heavy use of low-level programming at all levels. All of this hinders the introduction of modern development processes, has a negative impact on productivity and poses a risk to the maintainability, extensibility, testability, scalability and security of the product. 

### We are leading the way

For many years now, we at modern embedded have exclusively used generic tools in our projects, which have become the gold standard in their field of application. This alone solves a large number of problems, such as compatibility with other components of the development process or a lack of portability, and paves the way for modern development processes such as automated tests and CI/CD. 

To meet the challenges around the actual programming, we use modern C++. C++, when skillfully applied to embedded systems, provides powerful tools to handle the growing complexity of microcontroller software. Compared to C, C++ offers more expressive abstraction mechanisms with which we create modular, malleable architectures. For example, we use template metaprogramming and some object-oriented techniques to create more expressive, safer code that clearly separates abstract behavior from hardware-specific implementations without sacrificing runtime performance. 

Using our well-proven template library developed specifically for microcontrollers and selected elements of the C++ Standard Template Library, we move implementation details to deeper layers so developers can focus on high-level functionality. This approach allows for better code organization, improves readability and testability, and enables easier porting between different microcontroller families. 

### The problem will not solve itself 

Embedded development has evolved dramatically in recent years and this trend is likely to continue. Those who fail to adopt modern software development techniques now will reach a point where their product can no longer keep pace with the increasing requirements, if they have not already done so.