from setuptools import setup, find_packages

setup(
    name="botliy",
    version="1.0.0",
    author="Botliy",
    description="The official API SDK for botliy.online",
    long_description=open("README.md", "r").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/Botliy/botliy-python",
    packages=find_packages(),
    py_modules=["botliy"],
    install_requires=[
        "requests>=2.25.1",
    ],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.6",
)
