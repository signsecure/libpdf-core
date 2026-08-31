# Benchmark Report

> Generated on 2026-08-31 at 13:11:00 UTC
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
| libpdf          |    50.2 |  19.90ms |  33.18ms | ±7.77% |      26 |
| @cantoo/pdf-lib |     4.6 | 215.07ms | 217.87ms | ±0.88% |      10 |
| pdf-lib         |     4.6 | 218.76ms | 233.54ms | ±2.38% |      10 |

- **libpdf** is 10.81x faster than @cantoo/pdf-lib
- **libpdf** is 10.99x faster than pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.0K |  77us |  176us | ±2.71% |   6,485 |
| pdf-lib         |    3.0K | 331us | 1.33ms | ±2.66% |   1,510 |
| @cantoo/pdf-lib |    2.7K | 365us | 1.68ms | ±2.89% |   1,371 |

- **libpdf** is 4.30x faster than pdf-lib
- **libpdf** is 4.73x faster than @cantoo/pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |    8.2K | 122us |  238us | ±1.09% |   4,109 |
| @cantoo/pdf-lib |    2.4K | 408us | 1.96ms | ±3.19% |   1,225 |
| pdf-lib         |    2.2K | 450us | 1.85ms | ±4.08% |   1,111 |

- **libpdf** is 3.35x faster than @cantoo/pdf-lib
- **libpdf** is 3.70x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    2.9K |  350us |  803us | ±1.27% |   1,427 |
| pdf-lib         |   751.1 | 1.33ms | 4.83ms | ±6.26% |     376 |
| @cantoo/pdf-lib |   585.5 | 1.71ms | 5.84ms | ±6.99% |     293 |

- **libpdf** is 3.80x faster than pdf-lib
- **libpdf** is 4.87x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    56.2 |  17.79ms |  22.33ms | ±2.26% |      29 |
| pdf-lib         |     3.2 | 314.84ms | 347.74ms | ±2.82% |      10 |
| @cantoo/pdf-lib |     1.6 | 606.65ms | 634.61ms | ±1.85% |      10 |

- **libpdf** is 17.70x faster than pdf-lib
- **libpdf** is 34.10x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| pdf-lib         |     3.2 | 308.66ms | 316.88ms | ±1.20% |      10 |
| libpdf          |     3.0 | 335.77ms | 350.04ms | ±1.50% |      10 |
| @cantoo/pdf-lib |     1.6 | 640.44ms | 667.99ms | ±1.32% |      10 |

- **pdf-lib** is 1.09x faster than libpdf
- **pdf-lib** is 2.07x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |     p99 |    RME | Samples |
| :-------------- | ------: | -----: | ------: | -----: | ------: |
| libpdf          |   275.1 | 3.64ms |  4.15ms | ±0.77% |     138 |
| pdf-lib         |   114.8 | 8.71ms | 10.79ms | ±1.50% |      58 |
| @cantoo/pdf-lib |   105.2 | 9.51ms | 15.17ms | ±3.53% |      53 |

- **libpdf** is 2.40x faster than pdf-lib
- **libpdf** is 2.62x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    24.4 | 40.96ms | 45.12ms | ±2.93% |      13 |
| pdf-lib         |    14.3 | 70.17ms | 79.36ms | ±5.51% |       8 |
| @cantoo/pdf-lib |    13.3 | 75.43ms | 80.43ms | ±4.37% |       7 |

- **libpdf** is 1.71x faster than pdf-lib
- **libpdf** is 1.84x faster than @cantoo/pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     1.3 | 751.41ms | 751.41ms | ±0.00% |       1 |
| pdf-lib         |   0.753 |    1.33s |    1.33s | ±0.00% |       1 |
| @cantoo/pdf-lib |   0.701 |    1.43s |    1.43s | ±0.00% |       1 |

- **libpdf** is 1.77x faster than pdf-lib
- **libpdf** is 1.90x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   212.3 |  4.71ms |  5.27ms | ±0.73% |     107 |
| pdf-lib         |    87.1 | 11.48ms | 13.07ms | ±1.51% |      44 |
| @cantoo/pdf-lib |    77.7 | 12.87ms | 13.86ms | ±1.30% |      39 |

- **libpdf** is 2.44x faster than pdf-lib
- **libpdf** is 2.73x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    65.8 | 15.19ms | 17.71ms | ±1.31% |      33 |
| pdf-lib         |    19.4 | 51.51ms | 53.00ms | ±0.84% |      10 |
| @cantoo/pdf-lib |    16.2 | 61.59ms | 62.85ms | ±0.80% |       9 |

- **libpdf** is 3.39x faster than pdf-lib
- **libpdf** is 4.05x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    48.1 | 20.79ms | 27.66ms | ±4.75% |      25 |
| @cantoo/pdf-lib |    37.7 | 26.54ms | 34.94ms | ±4.33% |      19 |
| pdf-lib         |    36.2 | 27.60ms | 45.00ms | ±7.74% |      19 |

- **libpdf** is 1.28x faster than @cantoo/pdf-lib
- **libpdf** is 1.33x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    58.0 | 17.23ms | 22.98ms | ±3.50% |      30 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    32.1 | 31.18ms | 48.13ms | ±7.61% |      17 |

- **libpdf** is 1.81x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |   889.4 | 1.12ms | 2.77ms | ±3.21% |     445 |
| copy 10 pages from 100-page PDF |   213.1 | 4.69ms | 7.37ms | ±2.20% |     107 |
| copy all 100 pages              |   129.8 | 7.70ms | 8.06ms | ±0.52% |      65 |

- **copy 1 page** is 4.17x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 6.85x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------------- | ------: | -----: | -----: | -----: | ------: |
| duplicate page 0                          |   993.3 | 1.01ms | 1.42ms | ±0.76% |     497 |
| duplicate all pages (double the document) |   985.3 | 1.01ms | 1.38ms | ±0.60% |     493 |

- **duplicate page 0** is 1.01x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------------- | ------: | ------: | ------: | -----: | ------: |
| merge 2 small PDFs      |   641.7 |  1.56ms |  1.97ms | ±1.09% |     321 |
| merge 10 small PDFs     |   121.8 |  8.21ms | 11.99ms | ±1.68% |      61 |
| merge 2 x 100-page PDFs |    69.1 | 14.47ms | 15.26ms | ±0.81% |      35 |

- **merge 2 small PDFs** is 5.27x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.29x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | -----: | -----: | -----: | ------: |
| draw 100 lines                      |    1.8K |  566us | 1.19ms | ±1.22% |     884 |
| draw 100 rectangles                 |    1.5K |  648us | 1.55ms | ±2.56% |     772 |
| draw 100 circles                    |    1.1K |  913us | 1.67ms | ±1.38% |     548 |
| create 10 pages with mixed content  |   681.4 | 1.47ms | 2.63ms | ±1.86% |     341 |
| draw 100 text lines (standard font) |   616.5 | 1.62ms | 3.04ms | ±1.89% |     309 |

- **draw 100 lines** is 1.15x faster than draw 100 rectangles
- **draw 100 lines** is 1.61x faster than draw 100 circles
- **draw 100 lines** is 2.59x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.87x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |    Mean |     p99 |    RME | Samples |
| :---------------- | ------: | ------: | ------: | -----: | ------: |
| read field values |   353.0 |  2.83ms |  5.22ms | ±1.67% |     177 |
| get form fields   |   301.5 |  3.32ms |  7.18ms | ±4.60% |     151 |
| flatten form      |   125.3 |  7.98ms |  9.31ms | ±1.07% |      63 |
| fill text fields  |    76.7 | 13.03ms | 17.13ms | ±4.69% |      39 |

- **read field values** is 1.17x faster than get form fields
- **read field values** is 2.82x faster than flatten form
- **read field values** is 4.60x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   16.3K |    61us |   180us | ±0.92% |   8,175 |
| load medium PDF (19KB) |   11.0K |    91us |   135us | ±0.51% |   5,496 |
| load form PDF (116KB)  |   747.4 |  1.34ms |  2.65ms | ±2.23% |     375 |
| load heavy PDF (2.0MB) |    55.8 | 17.93ms | 19.28ms | ±1.38% |      28 |

- **load small PDF (888B)** is 1.49x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 21.87x faster than load form PDF (116KB)
- **load small PDF (888B)** is 293.09x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |    9.0K |   111us |   316us | ±1.10% |   4,522 |
| incremental save (19KB)            |    5.6K |   177us |   371us | ±1.22% |   2,822 |
| save with modifications (19KB)     |    1.2K |   841us |  1.63ms | ±1.81% |     595 |
| save heavy PDF (2.0MB)             |    53.8 | 18.60ms | 20.23ms | ±1.08% |      27 |
| incremental save heavy PDF (2.0MB) |    50.6 | 19.75ms | 20.67ms | ±1.17% |      26 |

- **save unmodified (19KB)** is 1.60x faster than incremental save (19KB)
- **save unmodified (19KB)** is 7.60x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 168.23x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 178.63x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |   863.0 |  1.16ms |  2.96ms | ±3.86% |     432 |
| extractPages (1 page from 100-page PDF)  |   285.8 |  3.50ms |  4.07ms | ±0.63% |     143 |
| extractPages (1 page from 2000-page PDF) |    18.1 | 55.36ms | 56.08ms | ±0.46% |      10 |

- **extractPages (1 page from small PDF)** is 3.02x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 47.77x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    24.9 |  40.24ms |  43.97ms | ±2.37% |      13 |
| split 2000-page PDF (0.9MB) |     1.4 | 715.50ms | 715.50ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 17.78x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    17.9 | 56.00ms | 58.06ms | ±1.18% |       9 |
| extract first 100 pages from 2000-page PDF             |    16.8 | 59.41ms | 60.50ms | ±1.12% |       9 |
| extract every 10th page from 2000-page PDF (200 pages) |    15.1 | 66.21ms | 70.47ms | ±2.41% |       8 |

- **extract first 10 pages from 2000-page PDF** is 1.06x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.18x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
