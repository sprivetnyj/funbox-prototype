//================================================================================

const productsBody = document.querySelector('.products__body');
const products = document.querySelectorAll('.product');

const productDefaultText = 'Чего сидишь? Порадуй котэ, <button class="product__buy">купи</button>.'
const productSelectedText = ['Сказочное заморское яство', 'Котэ не одобряет?'];

products.forEach(product => {
	const productBottom = product.querySelector('.product__bottom');
	const productFilling = product.querySelector('.product__filling');
	productBottom.setAttribute('data-ingredients', productBottom.textContent);
	if (product.classList.contains('product--disabled')) {
		productBottom.textContent = `Печалька, с ${productFilling.textContent} закончился.`;
	} else if (!product.classList.contains('product--selected')) {
		productBottom.innerHTML = productDefaultText;
	}
});

productsBody.addEventListener('click', (e) => {
	const el = e.target;
	if (el.closest('.product__card') || el.classList.contains('product__buy')) {
		if (!el.closest('.product').classList.contains('product--disabled')) {
			let productBottom;
			if (el.closest('.product__card')) {
				productBottom = el.closest('.product__card').nextElementSibling;
			} else {
				productBottom = el.parentElement;
			}
			if (el.closest('.product').classList.contains('product--selected')) {
				el.closest('.product').classList.remove('product--selected');
				productBottom.innerHTML = productDefaultText;
				el.closest('.product__card').querySelector('.product__desc').classList.remove('hover');
				el.closest('.product__card').querySelector('.product__desc').innerText = productSelectedText[0];
			} else {
				el.closest('.product').classList.add('product--selected');
				productBottom.innerText = productBottom.getAttribute('data-ingredients');
			}
		}

	}
});

productsBody.addEventListener('mouseover', (e) => {
	if (e.target.classList.contains('product__card')) {
		if (e.target.parentElement.classList.contains('product--selected')) {
			if (!e.relatedTarget.closest('.product__weight')) {
				e.target.querySelector('.product__desc').classList.add('hover');
				e.target.querySelector('.product__desc').innerText = productSelectedText[1];
			}
		}
	}
});

productsBody.addEventListener('mouseout', (e) => {
	if (e.target.classList.contains('product__card')) {
		if (!e.relatedTarget.classList.contains('product__weight')) {
			e.target.querySelector('.product__desc').classList.remove('hover');
			e.target.querySelector('.product__desc').innerText = productSelectedText[0];
		}
	}
});

//================================================================================