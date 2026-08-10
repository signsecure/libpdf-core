# Benchmark Report

> Generated on 2026-08-10 at 07:49:42 UTC
>
> System: linux | Intel(R) Xeon(R) 6973P-C (4 cores) | 16GB RAM | Bun 1.3.14

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
| libpdf          |    79.2 |  12.63ms |  17.86ms | ±2.30% |      40 |
| pdf-lib         |     5.4 | 185.17ms | 193.74ms | ±1.90% |      10 |
| @cantoo/pdf-lib |     5.3 | 186.98ms | 198.36ms | ±1.99% |      10 |

- **libpdf** is 14.66x faster than pdf-lib
- **libpdf** is 14.80x faster than @cantoo/pdf-lib

### Create blank PDF

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   26.3K |  38us |   76us | ±2.06% |  13,173 |
| @cantoo/pdf-lib |    5.2K | 192us | 1.09ms | ±3.58% |   2,608 |
| pdf-lib         |    4.6K | 216us | 1.13ms | ±4.14% |   2,316 |

- **libpdf** is 5.05x faster than @cantoo/pdf-lib
- **libpdf** is 5.69x faster than pdf-lib

### Add 10 pages

| Benchmark       | ops/sec |  Mean |    p99 |    RME | Samples |
| :-------------- | ------: | ----: | -----: | -----: | ------: |
| libpdf          |   13.7K |  73us |  135us | ±0.95% |   6,859 |
| @cantoo/pdf-lib |    3.8K | 262us | 1.71ms | ±4.29% |   1,907 |
| pdf-lib         |    3.5K | 285us | 1.46ms | ±3.20% |   1,757 |

- **libpdf** is 3.60x faster than @cantoo/pdf-lib
- **libpdf** is 3.90x faster than pdf-lib

### Draw 50 rectangles

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |    4.7K |  213us |  632us | ±1.62% |   2,346 |
| pdf-lib         |   978.4 | 1.02ms | 3.70ms | ±4.82% |     490 |
| @cantoo/pdf-lib |   818.8 | 1.22ms | 3.09ms | ±3.91% |     410 |

- **libpdf** is 4.80x faster than pdf-lib
- **libpdf** is 5.73x faster than @cantoo/pdf-lib

### Load and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |    80.0 |  12.51ms |  26.10ms | ±5.62% |      41 |
| pdf-lib         |     4.0 | 251.72ms | 269.75ms | ±2.01% |      10 |
| @cantoo/pdf-lib |     2.0 | 492.09ms | 550.52ms | ±3.69% |      10 |

- **libpdf** is 20.13x faster than pdf-lib
- **libpdf** is 39.35x faster than @cantoo/pdf-lib

### Load, modify, and save PDF

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     4.0 | 251.90ms | 273.31ms | ±4.10% |      10 |
| pdf-lib         |     3.8 | 261.27ms | 274.01ms | ±2.13% |      10 |
| @cantoo/pdf-lib |     2.0 | 495.08ms | 550.52ms | ±3.22% |      10 |

- **libpdf** is 1.04x faster than pdf-lib
- **libpdf** is 1.97x faster than @cantoo/pdf-lib

### Extract single page from 100-page PDF

| Benchmark       | ops/sec |   Mean |    p99 |    RME | Samples |
| :-------------- | ------: | -----: | -----: | -----: | ------: |
| libpdf          |   456.7 | 2.19ms | 3.29ms | ±1.30% |     229 |
| pdf-lib         |   136.4 | 7.33ms | 9.35ms | ±1.18% |      69 |
| @cantoo/pdf-lib |   128.9 | 7.76ms | 9.04ms | ±1.55% |      65 |

- **libpdf** is 3.35x faster than pdf-lib
- **libpdf** is 3.54x faster than @cantoo/pdf-lib

### Split 100-page PDF into single-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |     RME | Samples |
| :-------------- | ------: | ------: | ------: | ------: | ------: |
| libpdf          |    43.9 | 22.76ms | 24.99ms |  ±1.42% |      22 |
| @cantoo/pdf-lib |    19.5 | 51.36ms | 56.64ms |  ±3.66% |      10 |
| pdf-lib         |    18.3 | 54.77ms | 79.95ms | ±12.27% |      10 |

- **libpdf** is 2.26x faster than @cantoo/pdf-lib
- **libpdf** is 2.41x faster than pdf-lib

### Split 2000-page PDF into single-page PDFs (0.9MB)

| Benchmark       | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------- | ------: | -------: | -------: | -----: | ------: |
| libpdf          |     2.3 | 432.48ms | 432.48ms | ±0.00% |       1 |
| pdf-lib         |     1.0 | 971.14ms | 971.14ms | ±0.00% |       1 |
| @cantoo/pdf-lib |     1.0 | 986.23ms | 986.23ms | ±0.00% |       1 |

- **libpdf** is 2.25x faster than pdf-lib
- **libpdf** is 2.28x faster than @cantoo/pdf-lib

### Copy 10 pages between documents

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   370.4 |  2.70ms |  3.27ms | ±0.93% |     186 |
| pdf-lib         |   103.0 |  9.71ms | 10.83ms | ±0.93% |      52 |
| @cantoo/pdf-lib |    88.6 | 11.28ms | 13.13ms | ±1.45% |      45 |

- **libpdf** is 3.60x faster than pdf-lib
- **libpdf** is 4.18x faster than @cantoo/pdf-lib

### Merge 2 x 100-page PDFs

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |   111.2 |  8.99ms |  9.70ms | ±0.90% |      56 |
| pdf-lib         |    21.5 | 46.49ms | 49.13ms | ±1.97% |      11 |
| @cantoo/pdf-lib |    17.9 | 56.02ms | 57.23ms | ±1.21% |       9 |

- **libpdf** is 5.17x faster than pdf-lib
- **libpdf** is 6.23x faster than @cantoo/pdf-lib

### Fill FINTRAC form fields

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    70.0 | 14.29ms | 16.28ms | ±2.03% |      35 |
| @cantoo/pdf-lib |    46.6 | 21.45ms | 31.09ms | ±4.60% |      24 |
| pdf-lib         |    45.6 | 21.91ms | 37.49ms | ±7.88% |      24 |

- **libpdf** is 1.50x faster than @cantoo/pdf-lib
- **libpdf** is 1.53x faster than pdf-lib

### Fill and flatten FINTRAC form

| Benchmark       | ops/sec |    Mean |     p99 |    RME | Samples |
| :-------------- | ------: | ------: | ------: | -----: | ------: |
| libpdf          |    87.3 | 11.46ms | 14.86ms | ±2.66% |      44 |
| pdf-lib         |  FAILED |       - |       - |      - |       0 |
| @cantoo/pdf-lib |    40.1 | 24.93ms | 33.34ms | ±5.03% |      21 |

- **libpdf** is 2.18x faster than @cantoo/pdf-lib

## Copying

### Copy pages between documents

| Benchmark                       | ops/sec |   Mean |    p99 |    RME | Samples |
| :------------------------------ | ------: | -----: | -----: | -----: | ------: |
| copy 1 page                     |    1.6K |  624us | 1.28ms | ±2.76% |     801 |
| copy 10 pages from 100-page PDF |   381.8 | 2.62ms | 3.39ms | ±0.93% |     191 |
| copy all 100 pages              |   217.4 | 4.60ms | 5.20ms | ±0.87% |     109 |

- **copy 1 page** is 4.19x faster than copy 10 pages from 100-page PDF
- **copy 1 page** is 7.37x faster than copy all 100 pages

### Duplicate pages within same document

| Benchmark                                 | ops/sec |  Mean |   p99 |    RME | Samples |
| :---------------------------------------- | ------: | ----: | ----: | -----: | ------: |
| duplicate page 0                          |    1.8K | 569us | 891us | ±0.76% |     880 |
| duplicate all pages (double the document) |    1.8K | 571us | 964us | ±0.94% |     876 |

- **duplicate page 0** is 1.00x faster than duplicate all pages (double the document)

### Merge PDFs

| Benchmark               | ops/sec |   Mean |    p99 |    RME | Samples |
| :---------------------- | ------: | -----: | -----: | -----: | ------: |
| merge 2 small PDFs      |    1.1K |  915us | 1.32ms | ±0.99% |     547 |
| merge 10 small PDFs     |   214.6 | 4.66ms | 5.30ms | ±0.91% |     108 |
| merge 2 x 100-page PDFs |   118.3 | 8.45ms | 9.16ms | ±0.76% |      60 |

- **merge 2 small PDFs** is 5.09x faster than merge 10 small PDFs
- **merge 2 small PDFs** is 9.24x faster than merge 2 x 100-page PDFs

## Drawing

| Benchmark                           | ops/sec |  Mean |    p99 |    RME | Samples |
| :---------------------------------- | ------: | ----: | -----: | -----: | ------: |
| draw 100 lines                      |    3.0K | 336us |  828us | ±1.57% |   1,488 |
| draw 100 rectangles                 |    2.9K | 347us |  814us | ±1.50% |   1,440 |
| draw 100 circles                    |    1.7K | 601us | 1.30ms | ±1.84% |     833 |
| create 10 pages with mixed content  |    1.1K | 912us | 1.71ms | ±1.71% |     549 |
| draw 100 text lines (standard font) |    1.0K | 993us | 1.68ms | ±1.49% |     504 |

- **draw 100 lines** is 1.03x faster than draw 100 rectangles
- **draw 100 lines** is 1.79x faster than draw 100 circles
- **draw 100 lines** is 2.71x faster than create 10 pages with mixed content
- **draw 100 lines** is 2.96x faster than draw 100 text lines (standard font)

## Forms

| Benchmark         | ops/sec |   Mean |     p99 |    RME | Samples |
| :---------------- | ------: | -----: | ------: | -----: | ------: |
| read field values |   580.6 | 1.72ms |  2.62ms | ±1.31% |     291 |
| get form fields   |   531.0 | 1.88ms |  4.53ms | ±3.42% |     266 |
| flatten form      |   186.2 | 5.37ms |  7.97ms | ±2.32% |      94 |
| fill text fields  |   135.0 | 7.41ms | 10.91ms | ±3.38% |      68 |

- **read field values** is 1.09x faster than get form fields
- **read field values** is 3.12x faster than flatten form
- **read field values** is 4.30x faster than fill text fields

## Loading

| Benchmark              | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------- | ------: | ------: | ------: | -----: | ------: |
| load small PDF (888B)  |   28.3K |    35us |    70us | ±2.40% |  14,146 |
| load medium PDF (19KB) |   18.2K |    55us |    78us | ±0.52% |   9,124 |
| load form PDF (116KB)  |    1.0K |   961us |  1.50ms | ±0.95% |     521 |
| load heavy PDF (2.0MB) |    77.7 | 12.87ms | 14.04ms | ±1.60% |      39 |

- **load small PDF (888B)** is 1.55x faster than load medium PDF (19KB)
- **load small PDF (888B)** is 27.18x faster than load form PDF (116KB)
- **load small PDF (888B)** is 364.17x faster than load heavy PDF (2.0MB)

## Saving

| Benchmark                          | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------- | ------: | ------: | ------: | -----: | ------: |
| save unmodified (19KB)             |   18.3K |    55us |   103us | ±0.62% |   9,167 |
| incremental save (19KB)            |   11.2K |    89us |   217us | ±0.92% |   5,617 |
| save with modifications (19KB)     |    2.2K |   446us |   825us | ±1.26% |   1,121 |
| save heavy PDF (2.0MB)             |    89.3 | 11.20ms | 12.11ms | ±1.21% |      45 |
| incremental save heavy PDF (2.0MB) |    80.6 | 12.41ms | 13.73ms | ±1.40% |      41 |

- **save unmodified (19KB)** is 1.63x faster than incremental save (19KB)
- **save unmodified (19KB)** is 8.18x faster than save with modifications (19KB)
- **save unmodified (19KB)** is 205.35x faster than save heavy PDF (2.0MB)
- **save unmodified (19KB)** is 227.48x faster than incremental save heavy PDF (2.0MB)

## Splitting

### Extract single page

| Benchmark                                | ops/sec |    Mean |     p99 |    RME | Samples |
| :--------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extractPages (1 page from small PDF)     |    1.7K |   599us |  1.15ms | ±2.03% |     835 |
| extractPages (1 page from 100-page PDF)  |   472.3 |  2.12ms |  3.24ms | ±1.27% |     237 |
| extractPages (1 page from 2000-page PDF) |    30.6 | 32.63ms | 33.35ms | ±0.61% |      16 |

- **extractPages (1 page from small PDF)** is 3.53x faster than extractPages (1 page from 100-page PDF)
- **extractPages (1 page from small PDF)** is 54.45x faster than extractPages (1 page from 2000-page PDF)

### Split into single-page PDFs

| Benchmark                   | ops/sec |     Mean |      p99 |    RME | Samples |
| :-------------------------- | ------: | -------: | -------: | -----: | ------: |
| split 100-page PDF (0.1MB)  |    45.1 |  22.20ms |  29.25ms | ±4.08% |      23 |
| split 2000-page PDF (0.9MB) |     2.5 | 400.10ms | 400.10ms | ±0.00% |       1 |

- **split 100-page PDF (0.1MB)** is 18.03x faster than split 2000-page PDF (0.9MB)

### Batch page extraction

| Benchmark                                              | ops/sec |    Mean |     p99 |    RME | Samples |
| :----------------------------------------------------- | ------: | ------: | ------: | -----: | ------: |
| extract first 10 pages from 2000-page PDF              |    29.9 | 33.40ms | 34.93ms | ±0.92% |      16 |
| extract first 100 pages from 2000-page PDF             |    28.0 | 35.74ms | 36.92ms | ±1.17% |      14 |
| extract every 10th page from 2000-page PDF (200 pages) |    26.2 | 38.24ms | 38.77ms | ±0.42% |      14 |

- **extract first 10 pages from 2000-page PDF** is 1.07x faster than extract first 100 pages from 2000-page PDF
- **extract first 10 pages from 2000-page PDF** is 1.14x faster than extract every 10th page from 2000-page PDF (200 pages)

---

_Results are machine-dependent. Use for relative comparison only._
