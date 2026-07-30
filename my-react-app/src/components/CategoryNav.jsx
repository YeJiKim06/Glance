import React from 'react'

function CategoryNav({ categories, activeCategory, onSelect }) {
  return (
    <nav className="category-nav" aria-label="뉴스 카테고리">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-tab ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onSelect(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </nav>
  )
}

export default CategoryNav
