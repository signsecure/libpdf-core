# Benchmark Report

> Generated on 2026-08-24 at 07:07:14 UTC
>
> System: linux | AMD EPYC 7763 64-Core Processor (4 cores) | 16GB RAM | Bun 1.4.0

---

## Contents

- [Comparison](#comparison)
- [Copying](#copying)
- [Drawing](#drawing)
- [Forms](#forms)
- [Loading](#loading)
- [Saving](#saving)
- [Splitting](#splitting)

## Comparison

### Load PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    53.3 |  18.76ms |  24.55ms | ±3.55% |      27 |
| @cantoo/pdf-lib |     4.3 | 231.44ms | 238.64ms | ±1.34% |      10 |
| pdf-lib         |     4.3 | 233.64ms | 245.71ms | ±2.05% |      10 |

- **libpdf** is 12.34x faster than @cantoo/pdf-lib
- **libpdf** is 12.45x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   12.9K |  77us |  170us | ±2.96% |   6,468 |
| pdf-lib         |    2.8K | 363us | 1.59ms | ±2.83% |   1,378 |
| @cantoo/pdf-lib |    2.3K | 431us | 2.27ms | ±5.60% |   1,161 |

- **libpdf** is 4.69x faster than pdf-lib
- **libpdf** is 5.57x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    7.8K | 129us |  268us | ±1.41% |   3,878 |
| @cantoo/pdf-lib |    2.2K | 451us | 2.54ms | ±4.81% |   1,108 |
| pdf-lib         |    2.0K | 490us | 2.21ms | ±3.99% |   1,020 |

- **libpdf** is 3.50x faster than @cantoo/pdf-lib
- **libpdf** is 3.80x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.7K |  368us | 1.00ms | ±1.83% |   1,360 |
| pdf-lib         |   660.1 | 1.52ms | 6.38ms | ±7.67% |     333 |
| @cantoo/pdf-lib |   551.6 | 1.81ms | 6.09ms | ±7.34% |     279 |

- **libpdf** is 4.12x faster than pdf-lib
- **libpdf** is 4.93x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    53.1 |  18.84ms |  28.06ms | ±4.58% |      27 |
| pdf-lib         |     3.1 | 321.10ms | 336.87ms | ±1.62% |      10 |
| @cantoo/pdf-lib |     1.6 | 615.50ms | 656.29ms | ±2.90% |      10 |

- **libpdf** is 17.05x faster than pdf-lib
- **libpdf** is 32.67x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.1 | 318.02ms | 333.96ms | ±1.47% |      10 |
| libpdf          |     2.8 | 355.97ms | 375.53ms | ±1.82% |      10 |
| @cantoo/pdf-lib |     1.6 | 613.55ms | 630.58ms | ±1.66% |      10 |

- **pdf-lib** is 1.12x faster than libpdf
- **pdf-lib** is 1.93x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   245.3 |  4.08ms |  5.29ms | ±1.28% |     123 |
| pdf-lib         |   106.1 |  9.43ms | 11.53ms | ±2.21% |      54 |
| @cantoo/pdf-lib |    99.2 | 10.08ms | 16.82ms | ±3.95% |      50 |

- **libpdf** is 2.31x faster than pdf-lib
- **libpdf** is 2.47x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    23.7 | 42.13ms | 46.92ms | ±3.02% |      12 |
| pdf-lib         |    12.9 | 77.81ms | 94.92ms | ±9.73% |       7 |
| @cantoo/pdf-lib |    12.7 | 78.54ms | 85.44ms | ±4.92% |       7 |

- **libpdf** is 1.85x faster than pdf-lib
- **libpdf** is 1.86x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 779.67ms | 779.67ms | ±0.00% |       1 |
| pdf-lib         |   0.757 |    1.32s |    1.32s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.680 |    1.47s |    1.47s | ±0.00% |       1 |

- **libpdf** is 1.69x faster than pdf-lib
- **libpdf** is 1.88x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   203.3 |  4.92ms |  5.87ms | ±1.18% |     102 |
| pdf-lib         |    85.4 | 11.71ms | 13.50ms | ±1.64% |      43 |
| @cantoo/pdf-lib |    76.0 | 13.16ms | 14.58ms | ±1.71% |      38 |

- **libpdf** is 2.38x faster than pdf-lib
- **libpdf** is 2.68x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    61.6 | 16.24ms | 17.61ms | ±1.42% |      31 |
| pdf-lib         |    18.8 | 53.10ms | 53.82ms | ±0.87% |      10 |
| @cantoo/pdf-lib |    15.7 | 63.86ms | 66.26ms | ±1.58% |       8 |

- **libpdf** is 3.27x faster than pdf-lib
- **libpdf** is 3.93x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    45.2 | 22.10ms | 26.53ms | ±3.37% |      23 |
| @cantoo/pdf-lib |    34.9 | 28.66ms | 39.46ms | ±6.24% |      18 |
| pdf-lib         |    34.6 | 28.93ms | 40.56ms | ±5.91% |      18 |

- **libpdf** is 1.30x faster than @cantoo/pdf-lib
- **libpdf** is 1.31x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    55.5 | 18.02ms | 23.24ms | ±3.09% |      28 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    30.4 | 32.85ms | 42.84ms | ±5.28% |      16 |

- **libpdf** is 1.82x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |     p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | ------: | -----: | ------: |
| copy 1 page                     |   825.0 | 1.21ms |  2.74ms | ±3.31% |     413 |
| copy 10 pages from 100-page PDF |   203.0 | 4.93ms |  8.48ms | ±2.80% |     102 |
| copy all 100 pages              |   120.6 | 8.29ms | 10.70ms | ±1.48% |      61 |

- **copy 1 page** is 4.06x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.84x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate all pages (double the document) |   957.7 | 1.04ms | 1.47ms | ±0.80% |     479 |
| duplicate page 0                          |   953.2 | 1.05ms | 1.52ms | ±0.79% |     477 |

- **duplicate all pages (double the document)** is 1.00x faster than duplicate page 0

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   614.8 |  1.63ms |  2.17ms | ±1.01% |     308 |
| merge 10 small PDFs     |   112.7 |  8.87ms | 12.28ms | ±1.63% |      57 |
| merge 2 x 100-page PDFs |    66.2 | 15.10ms | 18.10ms | ±1.70% |      34 |

- **merge 2 small PDFs** is 5.45x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.28x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.7K |  576us | 1.21ms | ±1.28% |     868 |
| draw 100 rectangles                 |    1.5K |  651us | 1.52ms | ±3.30% |     768 |
| draw 100 circles                    |    1.1K |  950us | 1.90ms | ±1.67% |     527 |
| create 10 pages with mixed content  |   676.6 | 1.48ms | 2.87ms | ±2.14% |     339 |
| draw 100 text lines (standard font) |   623.1 | 1.60ms | 2.49ms | ±1.48% |     312 |

- **draw 100 lines** is 1.13x faster than draw 100 rectangles
- **draw 100 lines** is 1.65x faster than draw 100 circles
- **draw 100 lines** is 2.57x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.79x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   335.8 |  2.98ms |  5.16ms | ±2.59% |     168 |
| get form fields   |   293.9 |  3.40ms |  7.07ms | ±4.87% |     147 |
| flatten form      |   119.8 |  8.34ms |  9.45ms | ±1.18% |      60 |
| fill text fields  |    76.7 | 13.04ms | 18.32ms | ±3.87% |      39 |

- **read field values** is 1.14x faster than get form fields
- **read field values** is 2.80x faster than flatten form
- **read field values** is 4.38x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   15.7K |    64us |   182us | ±5.56% |   7,830 |
| load medium PDF (19KB) |   11.3K |    89us |   125us | ±0.64% |   5,648 |
| load form PDF (116KB)  |   769.0 |  1.30ms |  2.43ms | ±1.86% |     385 |
| load heavy PDF (2.0MB) |    55.6 | 17.98ms | 20.05ms | ±1.62% |      28 |

- **load small PDF (888B)** is 1.39x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 20.36x faster than load form PDF (116KB)
- **load small PDF (888B)** is 281.60x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    8.5K |   118us |   367us | ±1.70% |   4,227 |
| incremental save (19KB)            |    6.3K |   158us |   316us | ±0.89% |   3,169 |
| save with modifications (19KB)     |    1.2K |   823us |  1.57ms | ±1.62% |     608 |
| save heavy PDF (2.0MB)             |    54.5 | 18.36ms | 19.40ms | ±1.31% |      28 |
| incremental save heavy PDF (2.0MB) |    52.4 | 19.09ms | 21.87ms | ±1.71% |      27 |

- **save unmodified (19KB)** is 1.33x faster than incremental save (19KB)
- **save unmodified (19KB)** is 6.96x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 155.23x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 161.39x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   853.7 |  1.17ms |  2.86ms | ±3.77% |     427 |
| extractPages (1 page from 100-page PDF)  |   278.2 |  3.59ms |  4.25ms | ±0.90% |     140 |
| extractPages (1 page from 2000-page PDF) |    17.9 | 56.01ms | 57.04ms | ±0.84% |      10 |

- **extractPages (1 page from small PDF)** is 3.07x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 47.82x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    24.4 |  40.94ms |  45.89ms | ±2.50% |      13 |
| split 2000-page PDF (0.9MB) |     1.3 | 743.89ms | 743.89ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.17x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.6 | 56.77ms | 58.12ms | ±1.18% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.4 | 61.11ms | 62.10ms | ±0.78% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.0 | 66.60ms | 67.66ms | ±1.17% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.08x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.17x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
