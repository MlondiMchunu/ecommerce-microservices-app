import mongoose from 'mongoose';
import express from 'express';
import {errorHandler} from './middleware/errorHandler';
import {logger} from './middleware/logger';
import {ProductController} from './productController';